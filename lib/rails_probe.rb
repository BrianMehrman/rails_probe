require "rails_probe/engine"

module RailsProbe
  def self.listening?
    @listening
  end

  def self.listening=(on)
    @listening = on
  end
end
