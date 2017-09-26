RailsProbe::Engine.routes.draw do
  get 'main', to: 'application#main'
  root to: 'application#index'

  resources :reports do
    collection { delete '/', to: 'reports#destory_all' }
    member { get 'print/:file', to: 'reports#print' }
  end
  # get 'reports', to: 'reports#index'
  # get 'reports/:id', to: 'reports#show'

  get 'listener', to: 'listener#index'
  get 'listener/on', to: 'listener#on'
  get 'listener/off', to: 'listener#off'

  get ':id', to: 'application#index'
end
