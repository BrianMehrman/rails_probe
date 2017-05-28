require 'ruby-prof'

module RailsProbe
  module Listener
    extend ActiveSupport::Concern
    BASE_PATH = 'tmp/ruby_profiles'

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
        path = write_profile(result, event_name)
        RailsProbe::Report.create(action: event_name, path: path, session: session.try(:id), host: request.try(:host), user_id: user.try(:id))
      ensure
        block.call
      end
    end

    def timestamp
      DateTime.current.strftime('%Y%m%dT%H%M%S')
    end

    def dir
      [BASE_PATH, Rails.env].join('/')
    end

    def write_profile(result, event_name)
      # record resulto
      output_dir = [dir, event_name, timestamp].join('/')
      printer    = RubyProf::GraphPrinter.new(result)
      file_path  = "#{output_dir}/graph.txt"

      FileUtils.mkdir_p output_dir unless File.exists?(output_dir)
      File.open(file_path, "w") do |f|
        printer.print(f)
      end

      file_path
    end
  end
end
