class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.string :admin
      t.string :password_digest
      t.datetime :datetime

      t.timestamps
    end
  end
end
