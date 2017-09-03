require 'pry'
require_dependency "rails_probe/application_controller"

module RailsProbe
  class ReportsController < ApplicationController
    before_action :set_report, only: [:show, :edit, :update, :destroy, :print]

    # GET /reports
    def index
      @reports = Report.all
      render json: @reports
    end

    # GET /reports/1
    def show
      @prints = @report.prints
    end

    # GET /reports/new
    def new
      @report = Report.new
    end

    # GET /reports/1/edit
    def edit
    end

    # POST /reports
    def create
      @report = Report.new(report_params)

      if @report.save
        redirect_to @report, notice: 'Report was successfully created.'
      else
        render :new
      end
    end

    # PATCH/PUT /reports/1
    def update
      if @report.update(report_params)
        redirect_to @report, notice: 'Report was successfully updated.'
      else
        render :edit
      end
    end

    # DELETE /reports/1
    def destroy
      @report.destroy
      redirect_to reports_url, notice: 'Report was successfully destroyed.'
    end

    def print
      print = @report.print(type)
      io = File.read(File.expand_path(print,Rails.root)) || 'No file found'
      render text: io.html_safe, layout: false
    end

    private

      # Use callbacks to share common setup or constraints between actions.
      def set_report
        @report = Report.find(params[:id])
      end

      def type
        params.permit(:type)[:type]
      end

      # Only allow a trusted parameter "white list" through.
      def report_params
        params.require(:report).permit(:host, :session, :user_id, :action, :path, :data)
      end
  end
end
