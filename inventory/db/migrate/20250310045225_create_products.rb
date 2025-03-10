class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :title
      t.string :description
      t.decimal :price
      t.string :category
      t.string :image_url

      t.timestamps
    end

    add_index :products, :category
  end
end
