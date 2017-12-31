require 'rails_helper'

module RailsProbe
  RSpec.describe Printer do
    class ReportPrinter
      def print(f, options)
        true
      end
    end

    class TestPrinter < Printer
      PRINTER = ReportPrinter

      private

      def printer_filename
        'test.txt'
      end
    end

    let(:result) { double(:result) }
    let(:report) { double(:report, id: 'abc-123') }
    let(:foo_printer) { ReportPrinter.new }

    subject { TestPrinter.new(result, report, 'foo#index') }

    describe '#print' do
      it 'creates a filepath' do
        allow(subject).to receive(:printer_filename).and_return('foo.txt')
        allow(subject).to receive(:printer).and_return(foo_printer)
        allow(subject).to receive(:timestamp).and_return('17760704T101234')
        expect(subject.print).to eq('tmp/ruby_profiles/test/abc-123/17760704T101234/foo.txt')
      end

      it 'calls a provided printer' do
        expect(subject).to receive(:printer).and_return(foo_printer)
        subject.print
      end
    end
  end
end
