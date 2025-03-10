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

ActiveRecord::Schema[8.0].define(version: 2025_03_10_051732) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "product_carts", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.integer "user_count"
    t.integer "item_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_carts_on_product_id"
  end

  create_table "product_inventories", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.integer "available_count"
    t.integer "hold_count"
    t.integer "sold_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_inventories_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.decimal "price"
    t.string "category"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_products_on_category"
  end

  add_foreign_key "product_carts", "products"
  add_foreign_key "product_inventories", "products"
end
