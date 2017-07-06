require 'rails_helper'

module RailsProbe
  RSpec.describe ReportsController, type: :controller do
    routes { RailsProbe::Engine.routes }
    let!(:report) { Report.create }
    describe 'GET /rails_probe/reports' do
      it 'assigns all reports to @reports' do
        get :index
        expect(assigns(:reports)).to eq([report])
      end
    end
  end
end
