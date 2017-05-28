class CreateRailsProbeReports < ActiveRecord::Migration[5.1]
  def change
    create_table :rails_probe_reports do |t|
      t.string :host
      t.string :session
      t.integer :user_id
      t.string :action
      t.string :path
      t.string :data

      t.timestamps
    end
  end
end
