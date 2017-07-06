module RailsProbe
  class Report < ApplicationRecord

    serialize :data

    def print(type)
      prints[type]
    end

    def prints
      raw_prints.map { |p| Print.new(p[0], p[1]) }
    end

    private

    Print = Struct.new(:name, :path)

    def raw_prints
      data[:prints] || []
    end
  end
end
