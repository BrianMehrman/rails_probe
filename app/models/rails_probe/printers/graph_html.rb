module RailsProbe
  module Printers
    class GraphHtml < Printer
      PRINTER = RubyProf::GraphHtmlPrinter

      def name
        'Graph HTML'
      end

      private

      def printer_filename
        'graph.html'
      end
    end
  end
end

