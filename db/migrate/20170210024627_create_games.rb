class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.string :name
      t.boolean :vote
      t.integer :weight
      t.integer :room_id

      t.timestamps
    end
  end
end
