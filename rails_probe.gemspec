$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rails_probe/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rails_probe"
  s.version     = RailsProbe::VERSION
  s.authors     = ["brianmehrman"]
  s.email       = ["bcmehrman@gmail.com"]
  s.summary     = "Summary of RailsProbe."
  s.description = "Description of RailsProbe."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.1.0"

  s.add_development_dependency "sqlite3"
end
