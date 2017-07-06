RailsProbe::Engine.routes.draw do
  root to: 'reports#index'

  resources :reports do
    member { get 'print/:type', to: 'reports#print' }
  end
  # get 'reports', to: 'reports#index'
  # get 'reports/:id', to: 'reports#show'

  post 'listener/on', to: 'listener#on'
  post 'listener/off', to: 'listener#off'
end
