class TimeEventsController < ApplicationController
    def create
        employee = Employee.find_by(id: params[:employee_id])
        time_event = employee.time_events.build(date: time_event_params[:date])

        time_event.save ? (render json: time_event) : (render json: {message: "Clock In unsuccessful"})
    end

    def update
        time_event = TimeEvent.find_by(id: params[:id])
        message = {message: time_event.errors.full_messages}

        if params[:break_start]
            time_event.update(break_start: time_event_params[:break_start]) ? (render json: time_event) : (render json: message)
        elsif params[:break_end] && params[:time_out]
            time_event.update(break_end: time_event_params[:break_end], time_out: time_event_params[:time_out]) ? (render json: time_event) : (render json: message)
        elsif params[:break_end] && !params[:time_out]
            time_event.update(break_end: time_event_params[:break_end]) ? (render json: time_event) : (render json: message)
        elsif params[:time_out]
            time_event.update(time_out: time_event_params[:time_out]) ? (render json: time_event) : (render json: message)
        end
    end

    private
    def time_event_params
        params.require(:time_event).permit(:date, :break_start, :break_end, :time_out)
    end
end
