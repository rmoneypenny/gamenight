Rails.application.routes.draw do
  
  get '/index', :to => 'rooms#index' 
  get '/users/new', :to => 'users#new'
  post '/users/new', :to => 'users#create'
  post '/sessions/new', :to => 'sessions#create'
  delete '/sessions', :to => 'sessions#destroy'

  get '/setup', :to => 'rooms#new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
