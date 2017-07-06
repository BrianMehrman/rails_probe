module RailsProbe
  class Engine < ::Rails::Engine
    require 'jquery-rails'
    isolate_namespace RailsProbe
  end
end
