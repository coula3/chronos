class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :position
  has_many :time_events
end
