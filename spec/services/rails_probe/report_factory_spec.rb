require 'rails_helper'

module RailsProbe
  RSpec.describe ReportFactory do
    class Test < Printer
      class FooPrinter
        def initialize(results)
        end

        def print(io, options)
          'foo'
        end

      end

      PRINTER = RailsProbe::Test::FooPrinter

      def name
        'Test Printer'
      end

      def printer_filename
        'test.txt'
      end
    end

    describe '#create' do
      let(:profile) { double('profile') }
      let(:result) { double('result') }
      let(:report) { RailsProbe::Report.new( id: 'zyx-123') }
      let(:action) { 'foo#make' }
      let(:session) { '123abc' }
      let(:host) { 'test.local' }
      let(:user_id) { 'abc-987' }

      let(:test_printer) { Test.new(result, report, action) }

      subject { ReportFactory.new(profile, printers: [Test.name]) }

      it 'creates a report record' do
        expect {
          subject.create
        }.to change {
          RailsProbe::Report.count
        }.by(1)
      end

      it 'creates a report with options' do
        expect(RailsProbe::Report).to receive(:create).with({
          action: action,
          session: session,
          host: host,
          user_id: user_id
        }).and_return(report)

        ReportFactory.create(
          profile,
          printers: [Test.name],
          action: action,
          session: session,
          host: host,
          user_id: user_id
        )
      end

      it 'writes a profile for each printer' do
        allow(Test).to receive(:new).and_return(test_printer)
        expect(test_printer).to receive(:print).and_return("#{test_printer.name}.txt")
        subject.create
      end
    end
  end
end
