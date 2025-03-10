class CreateCartItems < ActiveRecord::Migration[8.0]
  def change
    create_table :cart_items do |t|
      t.integer :user_id
      t.integer :product_id
      t.integer :count
      t.decimal :unit_price

      t.timestamps
    end

    add_index :cart_items, :user_id
    add_index :cart_items, :product_id
  end
end
