Rails.application.routes.draw do

  namespace :admin do
    resources :missions do
      resources :spots
    end

    resources :users

    root 'missions#index'
  end

  namespace :api do
    resources :missions do
      resources :spots do
        resources :user_spot_links
      end
    end
  end

  root to: redirect('/admin')

end
