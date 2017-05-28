require 'rails_helper'

module RailsProbe
  RSpec.describe ReportsController, type: :controller do
    let!(:report) { Report.create }

    describe 'GET /rails_probe/reports' do
      it 'assigns all reports to @reports' do
        get '/rails_probe/reports'
        expect(assigns(:reports)).to eq([report])
      end
    end
  end
end
