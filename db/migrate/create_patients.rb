class CreatePatients < ActiveRecord::Migration[6.1]
    def change
      create_table :patients do |t|
        t.string :first_name
        t.string :last_name
        t.date :dob
        t.text :address
        t.timestamps
      end
    end
  end
  