require 'ruby-prof'

module RailsProbe
  module Printers
    class GraphText < Printer
      PRINTER = RubyProf::GraphPrinter

      def name
        'Graph Text'
      end

      private

      def printer_filename
        'graph.txt'
      end
    end
  end
end
