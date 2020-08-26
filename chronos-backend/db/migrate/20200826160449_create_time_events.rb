class CreateTimeEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :time_events do |t|
      t.datetime :date
      t.datetime :time_in
      t.datetime :time_out
      t.datetime :break_start
      t.datetime :break_end
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
