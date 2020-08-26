# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Employee.destroy_all

# c = 3
# c.times do
#     Employee.create(first_name: Faker::Name.unique.first_name, last_name: Faker::Name.unique.last_name)
# end
# puts "successfully created" if Employee.count == 3

# Employee.all.each do |emp|
#     emp.update(email: emp.first_name[0].downcase + emp.last_name.downcase + "@" + "zmart.io")
# end
# puts "#{3} emails successfully added" if Employee.count {|e| e.first_name} == 3


# TIME EVENTS
HOUR = 60 * 60

Employee.first.time_events.create(date: Time.new(2020, 8, 18, 12, 00, 00)-(HOUR * 4), time_in: Time.new(2020, 8, 18, 12, 00, 00)-(HOUR * 4), time_out: Time.new(2020, 8, 18, 12, 00, 00) + (HOUR * 2), break_start: Time.new(2020, 8, 18, 12, 00, 00)-(HOUR * 1), break_end: Time.new(2020, 8, 18, 12, 00, 00)-(HOUR * 0.75))

Employee.first.time_events.create(date: Time.new(2020, 8, 20, 12, 00, 00)-(HOUR * 4), time_in: Time.new(2020, 8, 20, 12, 00, 00)-(HOUR * 4))

puts "succuefully created 2 time events" if TimeEvent.count == 2