RailsProbe::Engine.routes.draw do
  root to: 'reports#index'

  get 'reports', to: 'reports#index'
  get 'reports/:id', to: 'reports#show'

  post 'listener/on', to: 'listener#on'
  post 'listener/off', to: 'listener#off'
end
