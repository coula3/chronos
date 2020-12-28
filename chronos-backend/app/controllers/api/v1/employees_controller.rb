class Api::V1::EmployeesController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def show
        @employee = Employee.find_by(id: params[:id])

        if @employee
            render json: { employee: EmployeeSerializer.new(@employee) }, status: :ok
        end
    end

    def create
        @employee = Employee.new(first_name: employee_params[:first_name].downcase, last_name: employee_params[:last_name].downcase, email: employee_params[:email].downcase, position: employee_params[:position], password: employee_params[:password])

        if @employee.save
            token = encode_token(user_id: @employee.id)
            render json: { employee: @employee, jwt: token }, status: :created
        else
            render json: {messages: @employee.errors.full_messages}, status: :not_acceptable
        end
    end

    def update
        @employee = Employee.find_by(id: params[:id])

        if @employee && @employee.authenticate(employee_params[:password])
            @employee.update(password: employee_params[:newPassword])
            render json: { employee: EmployeeSerializer.new(@employee) }, status: :ok
        else
            render json: { message: "Password update unsuccessful"}
        end
    end

    private
    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :position, :password, :newPassword)
    end
end
