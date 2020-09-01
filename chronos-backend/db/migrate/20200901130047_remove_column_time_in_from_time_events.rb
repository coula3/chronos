class RemoveColumnTimeInFromTimeEvents < ActiveRecord::Migration[6.0]
  def change
    remove_column :time_events, :time_in, :datetime
  end
end
