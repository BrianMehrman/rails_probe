module RailsProbe
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    skip_before_action :verify_authenticity_token

    before_action :cors_preflight_check
    after_action :cors_set_access_control_headers

    def index
      render file: Engine.root.join('client', 'build', 'index.html')
    end

    def main
      respond_to do |format|
        format.js { render file: Engine.root.join('client', 'build', 'main.js') }
        format.css { render file: Engine.root.join('client', 'build', 'main.css') }
      end
    end

    private

    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
      headers['Access-Control-Max-Age'] = "1728000"
    end

    def cors_preflight_check
      if request.method == 'OPTIONS'
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
        headers['Access-Control-Max-Age'] = '1728000'

        render :text => '', :content_type => 'text/plain'
      end
    end
  end
end
