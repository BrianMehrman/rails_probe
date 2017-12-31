# RailsProbe
The rails probe is a UI for managing and tracking ruby performance profiles.

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'rails_probe'
```

Or install it yourself as:
```bash
$ gem install rails_probe
```

And then execute:
```bash
$ bundle
```

Install migrations
```bash
$ rake rails_probe:install:migrations
$ rake db:migrate
```

Mount engine
```ruby
# config/routes.rb
...
mount RailsProbe::Engine => "/rails_probe"
...
```

Include Listener into controller you want to listen to
```ruby
class ApplicationController < ActionController::Base
  include RailsProbe::Listener

  ...
end
```

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
