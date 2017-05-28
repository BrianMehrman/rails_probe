require_dependency "rails_probe/application_controller"

module RailsProbe
  class ListenerController < ApplicationController

    def on
      render json: { listening: enable }, status: :accepted
    end

    def off
      render json: { listening: disable }, status: :accepted
    end

    private

    def enable
      RailsProbe.listening=true
      RailsProbe.listening?
    end

    def disable
      RailsProbe.listening=false
      RailsProbe.listening?
    end
  end
end
