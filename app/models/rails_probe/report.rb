module RailsProbe
  class Report < ActiveRecord::Base
    include ActiveModel::Serialization

    serialize :data

    before_destroy :delete_prints

    def attributes
      {
        id: nil,
        host: nil,
        session: nil,
        action: nil,
        created_at: nil,
        prints: []
      }
    end

    def print(type)
      selected_print = prints.detect { |p| p.type == type }
      selected_print.filepath
    end

    def prints
      build_prints
    end

    private

    Print = Struct.new(:name, :url, :type, :filepath)

    # Delete all the files saved for each report
    def delete_prints
      raw_prints.each { |_k, v| delete_print(v) }
    end

    def delete_print(filepath)
      File.delete(filepath) if File.exist?(filepath)
    end

    def build_prints
      @raw_prints ||= raw_prints.map do |p|
        name = p[0]
        filepath = p[1]

        type = name.try(:downcase).try(:tr, "\s", '-')
        ext  = File.extname(filepath)
        url  = "rails_probe/reports/#{id}/print/#{type}#{ext}"

        Print.new(name, url, type, filepath)
      end
    end

    def raw_prints
      data[:prints] || []
    end
  end
end
