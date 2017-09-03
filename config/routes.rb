RailsProbe::Engine.routes.draw do
  get 'main', to: 'application#main'
  root to: 'application#index'

  resources :reports do
    member { get 'print/:type', to: 'reports#print' }
  end
  # get 'reports', to: 'reports#index'
  # get 'reports/:id', to: 'reports#show'

  get 'listener', to: 'listener#index'
  get 'listener/on', to: 'listener#on'
  get 'listener/off', to: 'listener#off'
end
