Rails.application.routes.draw do
  
  get '/index', :to => 'rooms#index' 
  patch '/index', :to => 'rooms#updateur' 
  get '/users/new', :to => 'users#new'
  post '/users/new', :to => 'users#create'
  post '/sessions/new', :to => 'sessions#create'
  delete '/sessions', :to => 'sessions#destroy'

  get '/setup', :to => 'rooms#new'
  post '/setup', :to => 'rooms#create'
  patch '/setup', :to => 'rooms#update'
  delete '/setup', :to => 'rooms#destroy'

  get '/tournament', :to => 'tournaments#show'
  get '/join', :to => 'rooms#userroom'
  post '/join', :to => 'rooms#createur'

  get 'tools', :to => 'games#tools'

end
