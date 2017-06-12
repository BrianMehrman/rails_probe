require 'ruby-prof'

module RailsProbe
  module Listener
    extend ActiveSupport::Concern

    included do
      around_action :rails_probe_listen
    end

    def probed_event_name
      values = params.except(:controller, :action).values
      "#{params[:controller]}##{params[:action]}#{values.any? ? "(#{values.join(', ')})" : ''}"
    end

    def rails_probe_listen(&block)
      if RailsProbe.listening?
        Listener.listen(event_name: probed_event_name, session: session, request: request, user: try(:user), &block)
      else
        block.call
      end
    end

    module_function

    def listen(event_name:, session:, request:, user:, &block)
      begin
        # profile block
        result = RubyProf.profile do
          block.call
        end
        report = RailsProbe::Report.create(action: event_name, session: session.try(:id), host: request.try(:host), user_id: user.try(:id))
        path = write_profile(result, event_name, report)
        report.path = path
      ensure
        block.call
      end
    end

    def write_profile(result, event_name, report)
      Printer.new(result, event_name, report, 'call_stack').print
      Printer.new(result, event_name, report, 'graph_html').print
    end
  end
end
