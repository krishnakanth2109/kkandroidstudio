class PatientsController < ApplicationController
    before_action :authenticate_user!
    before_action :check_receptionist_role, only: [:new, :create, :edit, :update, :destroy]
  
    private
  
    def check_receptionist_role
      redirect_to root_path, alert: 'Not authorized' unless current_user.receptionist?
    end
  end
  