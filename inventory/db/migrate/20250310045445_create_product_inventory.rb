class CreateProductInventory < ActiveRecord::Migration[8.0]
  def change
    create_table :product_inventories do |t|
      t.references :product, null: false, foreign_key: true
      t.integer :available_count
      t.integer :hold_count
      t.integer :sold_count

      t.timestamps
    end
  end
end
