# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative "config/application"

Rails.application.load_tasks
def after_sign_in_path_for(resource)
    if current_user.receptionist?
      patients_path
    elsif current_user.doctor?
      doctor_dashboard_path
    else
      root_path
    end
  end
  