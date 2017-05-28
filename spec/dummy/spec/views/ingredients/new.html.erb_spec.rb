require 'rails_helper'

RSpec.describe "ingredients/new", type: :view do
  before(:each) do
    assign(:ingredient, Ingredient.new(
      :name => "MyString",
      :amount => 1.5,
      :unit => "MyString",
      :recipe_id => 1
    ))
  end

  it "renders new ingredient form" do
    render

    assert_select "form[action=?][method=?]", ingredients_path, "post" do

      assert_select "input#ingredient_name[name=?]", "ingredient[name]"

      assert_select "input#ingredient_amount[name=?]", "ingredient[amount]"

      assert_select "input#ingredient_unit[name=?]", "ingredient[unit]"

      assert_select "input#ingredient_recipe_id[name=?]", "ingredient[recipe_id]"
    end
  end
end
