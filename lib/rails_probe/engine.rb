module RailsProbe
  class Engine < ::Rails::Engine
    require 'jquery-rails'
    isolate_namespace RailsProbe

    config.generators do |g|
      g.test_framework :rspec, fixture: false
    end
  end
end
