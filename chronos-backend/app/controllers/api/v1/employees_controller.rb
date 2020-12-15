class Api::V1::EmployeesController < ApplicationController
    def create
        employee = Employee.new(employee_params)
        employee.save ? (render json: employee) : (render json: {message: employee.errors.full_messages.join("; ")})
    end

    private
    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :position, :password)
    end
end
