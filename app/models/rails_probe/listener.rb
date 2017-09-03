require 'ruby-prof'
require 'logger'

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
        profile = RubyProf.profile do
          block.call
        end

        ReportFactory.create(
          profile,
          action: event_name,
          session: session.try(:id),
          host: request.try(:host),
          user_id: user.try(:id),
          printers: [Printers::GraphHtml.name, Printers::CallStack.name]
        )
      rescue StandardError => e
        logger.error("RailsProbe Listener broke: #{e}")
        binding.pry
        # run call anyway (risky!)
        block.call
      end
    end

    def logger
      @logger ||= Logger.new(STDOUT)
    end
  end
end
