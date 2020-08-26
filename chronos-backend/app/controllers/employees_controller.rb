class EmployeesController < ApplicationController

    def signin
        employee = Employee.find_by(email: params[:email])
        render json: employee
    end

    def index
        employees = Employee.all
        render json: employees
    end
end
