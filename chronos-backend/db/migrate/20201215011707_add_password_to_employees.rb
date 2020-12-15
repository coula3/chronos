class AddPasswordToEmployees < ActiveRecord::Migration[6.0]
  def change
    add_column :employees, :password_digest, :string
  end
end
