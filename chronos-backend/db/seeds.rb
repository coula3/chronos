# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Employee.destroy_all

c = 3
c.times do
    Employee.create(first_name: Faker::Name.unique.first_name, last_name: Faker::Name.unique.last_name)
end
puts "successfully created" if Employee.count == 3

Employee.all.each do |emp|
    emp.update(email: emp.first_name[0].downcase + emp.last_name.downcase + "@" + "zmart.com")
end
puts "#{3} emails successfully added" if Employee.count {|e| e.first_name} == 3