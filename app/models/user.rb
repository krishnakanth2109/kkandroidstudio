class User < ApplicationRecord
    # Devise modules
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
    
    enum role: { receptionist: 0, doctor: 1 }
  end
  