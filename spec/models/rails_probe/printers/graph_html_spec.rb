require 'rails_helper'
require 'ruby_prof'

module RailsProbe
  module Printers
    RSpec.describe GraphHtml do
      let(:result) { double('result') }
      let(:report) { double('report') }
      let(:action) { double('action') }

      subject { described_class.new(result, report, action) }

      describe '::PRINTER' do
        it 'returns the RubyProf printer class' do
          expect(GraphHtml::PRINTER).to eq(RubyProf::GraphHtmlPrinter)
        end
      end

      describe '#name' do
        it 'returns name of the printer' do
          expect(subject.name).to eq('Graph HTML')
        end
      end
    end
  end
end