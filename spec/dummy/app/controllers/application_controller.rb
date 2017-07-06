class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include RailsProbe::Listener

  def user
    Struct.new(:id, :name)
  end
end
