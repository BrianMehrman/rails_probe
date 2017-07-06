# This migration comes from rails_probe (originally 20170429144230)
class CreateRailsProbeReports < ActiveRecord::Migration[5.1]
  def change
    create_table :rails_probe_reports, id: :uuid do |t|
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
