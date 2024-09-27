class CreateUsers < ActiveRecord::Migration[6.1]
    def change
      create_table :users do |t|
        t.string :name
        t.string :email
        t.integer :role, default: 0  # receptionist by default
        t.timestamps
      end
    end
  end
  