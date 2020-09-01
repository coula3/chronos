class TimeEventSerializer < ActiveModel::Serializer
  attributes :id, :date, :time_out, :break_start, :break_end, :employee_id
  belongs_to :employee
end
