require 'pry'
require_dependency "rails_probe/application_controller"

module RailsProbe
  class ReportsController < ApplicationController
    before_action :set_report, only: [:show, :print]

    # GET /reports
    def index
      @reports = Report.all
      render json: @reports
    end

    # GET /reports/1
    def show
      @prints = @report.prints
      render json: @report
    end

    # DELETE /reports/1
    def destroy
      @report.destroy
      redirect_to reports_url, notice: 'Report was successfully destroyed.'
    end

    def destory_all
      @reports = Reports.all
      @reports.destroy
      redirect_to reports_url, notice: 'Reports were successfully destroyed.'
    end

    def print
      report_print = @report.print(print_type)
      io = report_print ? File.expand_path(report_print, Rails.root) : 'No file found'
      render file: io, layout: false
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    def file
      params.permit(:file)[:file]
    end

    def print_type
      ext = File.extname(file)
      File.basename(file, ext)
    end

    # Only allow a trusted parameter "white list" through.
    def report_params
      params.require(:report).permit(:host, :session, :user_id, :action, :path)
    end
  end
end
