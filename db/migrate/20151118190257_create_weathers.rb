class CreateWeathers < ActiveRecord::Migration
  def change
    create_table :weathers do |t|
      t.references :user, index: true, foreign_key: true
      t.string :city
      t.integer :zipcode

      t.timestamps null: false
    end
  end
end
