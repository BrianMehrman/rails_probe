class CreateIngredients < ActiveRecord::Migration[5.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.float :amount
      t.string :unit
      t.integer :recipe_id

      t.timestamps
    end
  end
end