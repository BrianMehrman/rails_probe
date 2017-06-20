require 'rails_helper'
require 'JSON'


# ==============================
#  Dummy Testing for Listener
# ==============================
RSpec.describe RecipesController, type: :controller do
  routes { Rails.application.routes }

  describe '#listen' do
    before do
      RailsProbe.listening = true
      Recipe.create(name: "Sliced Bread", directions: "Take bread, slice perpendicular to longer side.")
      allow(RailsProbe::Listener).to receive(:timestamp).and_return('12345')
      allow(controller.session).to receive(:id).and_return('abc123')
      get :index
    end

    let(:json) { JSON.parse response.body }
    let(:report) { RailsProbe::Report.last }

    it 'records the action name' do
      expect(report.action).to eq("recipes#index")
    end

    # TODO: Mock out the RubyProf and file creation
    it 'records a file' do
      expect(report.path).to eq('tmp/ruby_profiles/test/recipes#index/12345/graph.txt')
    end

    it 'records a session id' do
      expect(report.session).to eq('abc123')
    end

    context 'with multiple printers defined'
  end
end

module RailsProbe
  RSpec.describe Listener, type: :model do
    it 'creates a report record' do
      described_class.listen(event_name: "foo", session: nil, request: nil, user: nil ) { puts 'something' }
      expect(RailsProbe::Report.count).to eq(1)
    end
  end
end
