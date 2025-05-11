class CreateOrderTables < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.decimal :total_price, precision: 10, scale: 2
      t.decimal :tax, precision: 10, scale: 2
      t.decimal :gross_total_price, precision: 10, scale: 2
      t.integer :user_id
      t.string :status
      t.timestamps
    end

    add_index :orders, :user_id
    add_index :orders, :status

    add_index :orders, :created_at
    add_index :orders, :updated_at

    create_table :order_items do |t|
      t.references :order, null: false, foreign_key: true, index: true
      t.integer :product_id
      t.string :title
      t.string :image_url
      t.integer :quantity
      t.decimal :unit_price, precision: 10, scale: 2
      t.timestamps
    end

    add_index :order_items, :product_id
    add_index :order_items, :created_at
    add_index :order_items, :updated_at

    create_table :order_status_history do |t|
      t.references :order, null: false, foreign_key: true, index: true
      t.string :status
      t.timestamps
    end

    add_index :order_status_history, :status

    create_table :order_payments do |t|
      t.references :order, null: false, foreign_key: true, index: true
      t.string :payment_id
      t.string :description
      t.string :street
      t.string :address_line_2
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.timestamps
    end

    add_index :order_payments, :payment_id
    add_index :order_payments, :created_at
    add_index :order_payments, :updated_at

    create_table :order_shipping do |t|
      t.references :order, null: false, foreign_key: true, index: true
      t.string :street
      t.string :address_line_2
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.string :tracking_number
      t.string :status
      t.string :carrier
      t.timestamps
    end

    add_index :order_shipping, :created_at
    add_index :order_shipping, :updated_at

    create_table :order_contacts do |t|
      t.references :order, null: false, foreign_key: true, index: true
      t.string :name
      t.string :email
      t.string :phone
      t.timestamps
    end

    add_index :order_contacts, :created_at
    add_index :order_contacts, :updated_at
  end
end
