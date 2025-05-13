class CreatePaymentTables < ActiveRecord::Migration[8.0]
  def change
    create_table :payments do |t|
      t.integer :order_id, null: false
      t.integer :user_id, null: false
      t.decimal :amount, precision: 10, scale: 2
      t.string :status
      t.timestamps
    end

    add_index :payments, :order_id
    add_index :payments, :user_id

    create_table :payment_status_histories do |t|
      t.integer :payment_id, null: false
      t.string :status, null: false
      t.timestamps
    end

    add_index :payment_status_histories, :payment_id
  end
end
