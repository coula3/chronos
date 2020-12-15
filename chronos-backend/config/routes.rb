Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/signin', to: "auth#create"

      resources :employees
      resources :time_events
    end
  end
  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
