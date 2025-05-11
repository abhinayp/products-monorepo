# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_05_11_195620) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "order_contacts", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.string "name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_order_contacts_on_created_at"
    t.index ["order_id"], name: "index_order_contacts_on_order_id"
    t.index ["updated_at"], name: "index_order_contacts_on_updated_at"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.integer "product_id"
    t.string "title"
    t.string "image_url"
    t.integer "quantity"
    t.decimal "unit_price", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_order_items_on_created_at"
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
    t.index ["updated_at"], name: "index_order_items_on_updated_at"
  end

  create_table "order_payments", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.string "payment_id"
    t.string "description"
    t.string "street"
    t.string "address_line_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_order_payments_on_created_at"
    t.index ["order_id"], name: "index_order_payments_on_order_id"
    t.index ["payment_id"], name: "index_order_payments_on_payment_id"
    t.index ["updated_at"], name: "index_order_payments_on_updated_at"
  end

  create_table "order_shipping", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.string "street"
    t.string "address_line_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.string "tracking_number"
    t.string "status"
    t.string "carrier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_order_shipping_on_created_at"
    t.index ["order_id"], name: "index_order_shipping_on_order_id"
    t.index ["updated_at"], name: "index_order_shipping_on_updated_at"
  end

  create_table "order_status_history", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_status_history_on_order_id"
    t.index ["status"], name: "index_order_status_history_on_status"
  end

  create_table "orders", force: :cascade do |t|
    t.decimal "total_price", precision: 10, scale: 2
    t.decimal "tax", precision: 10, scale: 2
    t.decimal "gross_total_price", precision: 10, scale: 2
    t.integer "user_id"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_orders_on_created_at"
    t.index ["status"], name: "index_orders_on_status"
    t.index ["updated_at"], name: "index_orders_on_updated_at"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  add_foreign_key "order_contacts", "orders"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_payments", "orders"
  add_foreign_key "order_shipping", "orders"
  add_foreign_key "order_status_history", "orders"
end
