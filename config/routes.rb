Rails.application.routes.draw do
  resources :oauth_clients do
    get :authorize, on: :member
    get :callback, on: :member
  end
end
