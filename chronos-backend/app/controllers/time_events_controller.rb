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
            render json: {message: "Clock In Failure"}
        end
    end
end
