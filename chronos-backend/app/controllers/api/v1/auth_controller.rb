class Api::V1::AuthController < ApplicationController
    def create
        employee = Employee.find_by(email: employee_params[:email])

        if employee && employee.authenticate(employee_params[:password])
            render json: employee
        else
            render json: {message: "No user account matches email"}
        end
    end

    private
    def employee_params
        params.require(:employee).permit(:email, :password)
    end
end