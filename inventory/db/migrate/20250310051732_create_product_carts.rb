class CreateProductCarts < ActiveRecord::Migration[8.0]
  def change
    create_table :product_carts do |t|
      t.references :product, null: false, foreign_key: true
      t.integer :user_count
      t.integer :item_count

      t.timestamps
    end
  end
end
