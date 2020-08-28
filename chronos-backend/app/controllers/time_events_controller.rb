class TimeEventsController < ApplicationController
    def index
        time_events = TimeEvent.all
        render json: time_events
    end

    def create
        employee = Employee.find_by(id: params[:employee_id])
        time_event = employee.time_events.build(date: params[:date], time_in: params[:time_in])
        if time_event.save
            render json: time_event
        else
            render json: {message: "Clock In unsuccessful"}
        end
    end

    def update
        time_event = TimeEvent.find_by(id: params[:id])
        message = {message: time_event.errors.full_messages}

        if params.keys.include?("time_out")
            if time_event.update(time_out: params[:time_out])
                render json: time_event
            else
                render json: message
            end
        elsif params.keys.include?("break_start")
            if time_event.update(break_start: params[:break_start])
                render json: time_event
            else
                render json: message
            end
        elsif params.keys.include?("break_end")
            if time_event.update(break_end: params[:break_end])
                render json: time_event
            else
                render json: message
            end
        end
    end
end
