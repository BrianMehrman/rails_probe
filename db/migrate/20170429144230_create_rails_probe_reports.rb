class CreateRailsProbeReports < ActiveRecord::Migration
  def change
    create_table :rails_probe_reports, id: :uuid do |t|
      t.string :host
      t.string :session
      t.integer :user_id
      t.string :action
      t.string :path
      t.text :data

      t.timestamps
    end
  end
end
