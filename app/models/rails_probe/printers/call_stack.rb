module RailsProbe
  module Printers
    class CallStack < Printer
      PRINTER = RubyProf::CallStackPrinter

      def name
        'Call Stack'
      end

      private

      def options
        {
          title: title,
          print_file: true
        }
      end

      def printer_filename
        'call_stack.html'
      end
    end
  end
end
