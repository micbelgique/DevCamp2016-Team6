Rails.application.routes.draw do

  resources :missions do
    resources :spots
  end

  namespace :api do
    resources :missions do
      resources :spots
    end
  end

end
