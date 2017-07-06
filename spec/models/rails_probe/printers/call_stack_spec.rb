require 'rails_helper'
require 'ruby_prof'

module RailsProbe
  module Printers
    RSpec.describe CallStack do
      let(:result) { double('result') }
      let(:report) { double('report') }
      let(:action) { double('action') }

      subject { described_class.new(result, report, action) }

      describe '::PRINTER' do
        it 'returns the RubyProf printer class' do
          expect(CallStack::PRINTER).to eq(RubyProf::CallStackPrinter)
        end
      end

      describe '#name' do
        it 'returns name of the printer' do
          expect(subject.name).to eq('Call Stack')
        end
      end
    end
  end
end
