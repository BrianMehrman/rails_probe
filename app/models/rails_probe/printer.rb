require 'ruby-prof'

module RailsProbe
  class Printer

    BASE_PATH = 'tmp/ruby_profiles'

    def self.dir
      [BASE_PATH, Rails.env].join('/')
    end

    def initialize(result, report, action)
      @result = result
      @report = report
      @action = action
    end

    # TODO: add rescue to handle failing printer
    def print
      File.open(filepath, 'w') do |f|
        printer.print(f, options)
      end
      filepath
    end

    private

    def timestamp
      DateTime.current.strftime('%Y%m%dT%H%M%S')
    end

    def output_dir
      [self.class.dir, @report.id, timestamp].join('/')
    end

    def filepath
      @filepath if @filepath
      FileUtils.mkdir_p(output_dir) unless File.exists?(output_dir)
      @filepath = "#{output_dir}/#{printer_filename}"
    end

    def options
      {}
    end

    def printer_filename
      raise NotImplementedError
    end

    def printer
      @printer ||= self.class::PRINTER.new(@result)
    end
  end
end
