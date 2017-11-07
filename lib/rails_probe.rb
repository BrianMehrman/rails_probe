require "rails_probe/engine"

module RailsProbe

  # Sets the directory where files are stored. This directory must be publicly
  # accessible for dashboard.
  PRINTERS_DIR = 'tmp'
  PRINTER_CONFIG = {
    graphText: true,
    graphHtml: false,
    callStack: false
  }

  def self.printer_config
    @printer_config || PRINTER_CONFIG
  end

  def self.printer_config=(config)
    @printer_config = config
  end

  def self.listening?
    @listening
  end

  def self.listening=(on)
    @listening = on
  end
end
