# README

chronos is an SPA that users (employees) can use to log their attendance in shift working environments. The app allows employees to sign up using an email address. Once employees have their user accounts set up,  they can at the start of their work shift, sign in and clock in. On sign in, if an employee has as many time records, the most recent 5 will be displayed. During a shift and at the policy mandated time for breaks, an employee will be able to record their break start time and subsequently their break end time. At the end of their work shift, they will be able to clock out and sign out, though an employee is not required to maintain the app session during the work shift.

 
- Architecture and models
The app has 2 models - Employee and TimeEvent(one-to-many relationship).
There is a backend API powered by Ruby and Rails and a frontend built with HTML, CSS, and JavaScript.
 
- Development
The application was developed using Ruby 2.6 and Rails 6, ES6, HTML and CSS
 
- Clone the application:
run “git clone git@github.com:coula3/chronos.git”
cd “chronos”
 
- Install bundler
run “gem install bundler”
run “bundle install”
 
- Database set up 
run “rails db:migrate RAILS_ENV=development”

- Seed database
run “rails db:seed”
 
- Start the Rails Server:
run “rails s”
 
- Launch the application:
visit “http://localhost:3000”