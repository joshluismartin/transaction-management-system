Rails.application.routes.draw do
  # Health check endpoint (optional but good practice)
  get "up" => "rails/health#show", as: :rails_health_check

  # Transaction routes
  resources :transactions, only: [ :index, :create ]
end
