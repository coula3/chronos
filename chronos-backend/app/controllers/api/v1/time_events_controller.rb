class Api::V1::TimeEventsController < ApplicationController
    def create
        employee = Employee.find_by(id: time_event_params[:employee_id])
        time_event = employee.time_events.build(date: time_event_params[:date])

        time_event.save ? (render json: time_event) : (render json: {message: "Clock In unsuccessful"})
    end

    def update
        time_event = TimeEvent.find_by(id: time_event_params[:id])
        @employee = TimeEvent.find_by(id: time_event_params[:id]).employee
        message = {message: time_event.errors.full_messages}

        if time_event_params[:break_start]
            time_event.update(break_start: time_event_params[:break_start]) ? (render json: time_event) : (render json: message)
        elsif time_event_params[:break_end] && !time_event_params[:time_out]
            time_event.update(break_end: time_event_params[:break_end]) ? (render json: time_event) : (render json: message)
        elsif !time_event_params[:break_end] && time_event_params[:time_out]
            if time_event.update(break_end: time_event_params[:time_out], time_out: time_event_params[:time_out])
                render json: { employee: EmployeeSerializer.new(@employee) }, status: :ok
            else
                render json: message
            end
        elsif time_event_params[:time_out]
            close_new_time_event(time_event, message, @employee)
        end
    end

    def destroy
        time_event = TimeEvent.find_by(id: params[:id])
        if time_event && time_event.destroy
            render json: { message: "Delete successful"}, status: :ok
        else
            render json: { message: "Delete unsuccessful"}, status: :not_acceptable
        end
    end

    private
    def time_event_params
        params.require(:time_event).permit(:id, :date, :break_start, :break_end, :time_out, :employee_id)
    end

    def close_new_time_event(time_event, message, employee)
        if time_event.update(time_out: time_event_params[:time_out])
            render json: { employee: EmployeeSerializer.new(employee) }, status: :ok
        else
            render json: message
        end
    end
end
