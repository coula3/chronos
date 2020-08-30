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

    def create
        employee = Employee.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email])
        
        if employee.save
            render json: employee
        else
            render json: {message: employee.errors.full_messages.join(" ")}
        end
    end
end
