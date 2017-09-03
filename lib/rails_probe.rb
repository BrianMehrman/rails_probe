require "rails_probe/engine"

module RailsProbe

  # Sets the directory where files are stored. This directory must be publicly
  # accessible for dashboard.
  PRINTERS_DIR = 'public'

  def self.listening?
    @listening
  end

  def self.listening=(on)
    @listening = on
  end
end
