class CreateCartMetadata < ActiveRecord::Migration[8.0]
  def change
    create_table :cart_metadata do |t|
      t.integer :user_id
      t.decimal :gross_total_price
      t.decimal :tax
      t.decimal :net_total_price

      t.timestamps
    end

    add_index :cart_metadata, :user_id
  end
end
