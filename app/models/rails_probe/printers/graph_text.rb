module RailsProbe
  module Printers
    class Graph < Printer
      PRINTER = RubyProf::GraphPrinter

      private

      def printer_filename
        'graph.txt'
      end
    end
  end
end
