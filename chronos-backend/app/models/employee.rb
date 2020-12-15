class Employee < ApplicationRecord
    has_many :time_events
    
    validates :first_name, :last_name, :position, :email, presence: true
    validates :email, uniqueness: { case_sensitive: false }
    validates :email, email: true
    has_secure_password
end