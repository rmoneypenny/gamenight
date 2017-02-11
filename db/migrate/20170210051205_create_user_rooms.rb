class CreateUserRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :user_rooms do |t|
      t.boolean :vote
      t.datetime :datetime

      t.timestamps
    end
  end
end
