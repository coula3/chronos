class Employee < ApplicationRecord
    has_many :time_events
    
    validates :first_name, :last_name, :position, :email, presence: true
    validates :first_name, :length => { :maximum => 10 }, :if => lambda{ first_name.present? }
    validates :first_name, :last_name, format: { with: /\A[a-zA-Z\-]+\z/, message: "only allows letters and hyphen" }, :if => lambda{ first_name.present? || last_name.present? }
    validates :last_name, :length => { :maximum => 15 }, :if => lambda{ last_name.present? }
    validates :email, uniqueness: { case_sensitive: false }
    validates :email, email: true
    has_secure_password
    validates :password, length: { in: 3..12}
end