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
        employee = Employee.new(employee_params)
        
        if employee.save
            render json: employee
        else
            render json: {message: employee.errors.full_messages.join(" ")}
        end
    end

    private
    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :position)
    end
end
