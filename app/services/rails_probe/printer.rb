module RailsProbe
  class Printer
    attr_accessor :result, :report, :event_name, :printer, :printer_type

    BASE_PATH = 'tmp/ruby_profiles'

    def initialize(result, event_name, report, printer_type)
      @result = result
      @report = report
      @event_name = event_name
      @printer_type = printer_type
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
      FileUtils.mkdir_p output_dir unless File.exists(output_dir)
      "#{output_dir}/#{printer_filename}"
    end

    def options
      case printer_type
      when 'call_stack'
        @options = {
          title: title,
          print_file: true
        }
      else
        @options = {}
      end
    end

    def printer_filename
      case printer_type
      when 'graph'
        'graph.txt'
      when 'graph_html'
        'graph.html'
      when 'call_stack'
        'call_stack.html'
      end
    end

    def printer
      case printer_type
      when 'graph'
        RubyProf::GraphPrinter.new(result)
      when 'graph_html'
        RubyProf::GraphHtmlPrinter.new(result)
      when 'call_stack'
        RubyProf::CallStackPrinter.new(result)
      end
    end
  end
end
