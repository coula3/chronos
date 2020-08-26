Rails.application.routes.draw do

  get '/employees/:email', to: "employees#signin", constraints: { email: /[^\/]+/}
  
  resources :time_events
  resources :employees
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
