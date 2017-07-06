require 'rails_helper'
require 'JSON'


# ==============================
#  Dummy Testing for Listener
# ==============================
RSpec.describe RecipesController, type: :controller do
  routes { Rails.application.routes }

  describe '#listen' do

    let(:user) { double(:user, id: 'user-abc') }
    before do
      RailsProbe.listening = true
      allow(RubyProf).to receive(:profile).and_return('foo')
      Recipe.create(name: "Sliced Bread", directions: "Take bread, slice perpendicular to longer side.")
      allow(controller.session).to receive(:id).and_return('session-a')
      allow(controller).to receive(:user).and_return(user)
    end

    let(:json) { JSON.parse response.body }
    let(:report) { RailsProbe::Report.order(created_at: :asc).last }

    it 'calls ReportFactory' do
      factory_args = {
        profile: 'foo',
        action: 'recipes#index',
        session: 'session-a',
        host: 'test.host',
        user_id: 'user-abc'
      }
      expect(RailsProbe::ReportFactory).to receive(:create).with(factory_args)
      get :index
    end
  end
end

module RailsProbe
  RSpec.describe Listener, type: :model do
    it 'creates a report record' do
     allow(RubyProf).to receive(:profile).and_return('foo')
     allow_any_instance_of(RubyProf::GraphPrinter).to receive(:print).and_return('bar')
     expect {
       described_class.listen(event_name: "foo", session: nil, request: nil, user: nil ) { puts 'something' }
     }.to change{ RailsProbe::Report.count }.by(1)
    end
  end
end
