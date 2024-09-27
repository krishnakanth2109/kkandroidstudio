class DoctorsController < ApplicationController
    before_action :authenticate_user!
    before_action :check_doctor_role
  
    def index
      @patients = Patient.all
      @patients_by_day = Patient.group_by_day(:created_at).count
    end
  
    private
  
    def check_doctor_role
      redirect_to root_path, alert: 'Not authorized' unless current_user.doctor?
    end
  end
  