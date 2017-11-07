RailsProbe::Engine.routes.draw do
  get 'main', to: 'application#main'
  root to: 'application#index'

  resources :reports do
    collection { delete 'remove', to: 'reports#destory_all' }
    member { get 'print/:file', to: 'reports#print' }
  end
  # get 'reports', to: 'reports#index'
  # get 'reports/:id', to: 'reports#show'

  get 'listener', to: 'listener#index'
  get 'listener/on', to: 'listener#on'
  get 'listener/off', to: 'listener#off'
  get 'listener/config', to: 'listener#config'
  post 'listener/config', to: 'listener#update_config'

  get ':id', to: 'application#index'
end
