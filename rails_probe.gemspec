$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'rails_probe/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'rails_probe'
  s.version     = RailsProbe::VERSION
  s.authors     = ['brianmehrman']
  s.email       = ['bcmehrman@gmail.com']
  s.summary     = 'Summary of RailsProbe.'
  s.description = 'Description of RailsProbe.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '~> 4.2.0'
  s.add_dependency 'ruby-prof', '~>0.16.2'
  s.add_dependency 'jquery-rails', '~>4.3.1'
  s.add_dependency 'active_model_serializers', '= 0.10.4'

  s.add_development_dependency 'guard', '2.14.1'
  s.add_development_dependency 'guard-rspec', '4.7.3'
  s.add_development_dependency 'rspec-rails', '~> 3.5.0'
  s.add_development_dependency 'pry'
  s.add_development_dependency 'better_errors'
  s.add_development_dependency 'rails-controller-testing'
  s.add_development_dependency 'pg'
end
