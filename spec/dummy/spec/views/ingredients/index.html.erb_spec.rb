require 'rails_helper'

RSpec.describe "ingredients/index", type: :view do
  before(:each) do
    assign(:ingredients, [
      Ingredient.create!(
        :name => "Name",
        :amount => 2.5,
        :unit => "Unit",
        :recipe_id => 3
      ),
      Ingredient.create!(
        :name => "Name",
        :amount => 2.5,
        :unit => "Unit",
        :recipe_id => 3
      )
    ])
  end

  it "renders a list of ingredients" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 2.5.to_s, :count => 2
    assert_select "tr>td", :text => "Unit".to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
