class Api::V1::AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        @employee = Employee.find_by(email: employee_params[:email].downcase)

        if @employee && @employee.authenticate(employee_params[:password])
            token = encode_token(user_id: @employee.id)
            render json: { employee: EmployeeSerializer.new(@employee), jwt: token }, status: :accepted
        else
            render json: {message: "Invalid email or password"}, status: :not_acceptable
        end
    end

    private
    def employee_params
        params.require(:employee).permit(:email, :password)
    end
end