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
          printers: available_printers
        )
      rescue StandardError => e
        logger.error("RailsProbe Listener broke: #{e}")
        # run call anyway (risky!)
        block.call
      end
    end

    # TODO: clean up printer mapping
    def available_printers
      printer_map = {
        graphText: Printers::GraphText.name,
        graphHtml: Printers::GraphHtml.name,
        callStack: Printers::CallStack.name
      }

      RailsProbe.printer_config.map do |printer, enabled|
        printer_map[printer.to_sym] if enabled
      end.compact
    end

    def logger
      @logger ||= Logger.new(STDOUT)
    end
  end
end
