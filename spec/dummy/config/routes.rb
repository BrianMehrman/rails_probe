Rails.application.routes.draw do
  mount RailsProbe::Engine => "/rails_probe"
  resources :ingredients
  resources :recipes
  root to: 'recipes#index'
end
