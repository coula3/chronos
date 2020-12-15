class Api::V1::EmployeesController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        employee = Employee.new(employee_params)
        token = encode_token(user_id: employee.id)

        if employee.save
            render json: employee, jwt: token, status: :created
        else
            render json: {message: employee.errors.full_messages.join("; ")}, status: :not_acceptable
        end
    end

    private
    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :position, :password)
    end
end
