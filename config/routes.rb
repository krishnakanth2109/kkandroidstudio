Rails.application.routes.draw do
  devise_for :users
  resources :patients

  get 'doctor_dashboard', to: 'doctors#index', as: 'doctor_dashboard'
  root 'home#index'
end
