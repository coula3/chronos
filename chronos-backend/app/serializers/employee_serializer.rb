class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email
  has_many :time_events
end
