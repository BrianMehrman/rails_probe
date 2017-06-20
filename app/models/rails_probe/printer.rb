module RailsProbe
  class Printer

    BASE_PATH = 'tmp/ruby_profiles'

    def initialize(result, report, action)
      @result = result
      @report = report
      @action = action
    end

    def print
      File.open(filepath, 'w') do |f|
        printer.print(f, options)
      end
    end

    private

    def timestamp
      DateTime.current.strftime('%Y%m%dT%H%M%S')
    end

    def dir
      [BASE_PATH, Rails.env, report.id, timestamp].join('/')
    end

    def filepath
      FileUtils.mkdir_p(output_dir) unless File.exists(output_dir)
      "#{output_dir}/#{printer_filename}"
    end

    def options
      {}
    end

    def printer_filename
      raise NotImplementedError
    end

    def printer
      @printer ||= PRINTER.new(result)
    end
  end
end
