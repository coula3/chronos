class TimeEventsController < ApplicationController
    def index
        time_events = TimeEvent.all
        render json: time_events
    end
end
