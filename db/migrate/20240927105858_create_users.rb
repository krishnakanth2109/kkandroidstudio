class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :role
      t.string :(role
      t.string :0
      t.string :for
      t.string :receptionist,
      t.string :1
      t.string :for
      t.string :doctor)

      t.timestamps
    end
  end
end
