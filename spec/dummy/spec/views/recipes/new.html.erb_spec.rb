require 'rails_helper'

RSpec.describe "recipes/new", type: :view do
  before(:each) do
    assign(:recipe, Recipe.new(
      :name => "MyString",
      :directions => "MyText"
    ))
  end

  it "renders new recipe form" do
    render

    assert_select "form[action=?][method=?]", recipes_path, "post" do

      assert_select "input#recipe_name[name=?]", "recipe[name]"

      assert_select "textarea#recipe_directions[name=?]", "recipe[directions]"
    end
  end
end
