class AddColumnPositionToEmployees < ActiveRecord::Migration[6.0]
  def change
    add_column :employees, :position, :string
  end
end
