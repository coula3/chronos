class EmployeesController < ApplicationController

    def signin
        if employee = Employee.find_by(email: params[:email])
            render json: employee
        elsif 
            render json: {message: "No user account matches email"}
        end
    end

    def index
        employees = Employee.all
        render json: employees
    end
end
