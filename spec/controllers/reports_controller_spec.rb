require 'rails_helper'

module RailsProbe
  RSpec.describe ReportsController, type: :controller do
    routes { RailsProbe::Engine.routes }
    let!(:report) { Report.create(data: { prints: [] }) }

    describe 'GET /rails_probe/reports' do
      it 'assigns all reports to @reports' do
        get :index
        expect(assigns(:reports)).to be_truthy
      end
    end

    describe 'GET /rails_probe/reports/[:id]' do
      it 'assigns report to @report' do
        get :show, id: report.id
        expect(assigns(:report).id).to eq(report.id)
      end
    end
  end
end
