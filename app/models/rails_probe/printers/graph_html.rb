module RailsProbe
  module Printers
    class GraphHtml < Printer
      PRINTER = RubyProf::GraphHtmlPrinter

      private

      def printer_filename
        'graph.html'
      end
    end
  end
end

