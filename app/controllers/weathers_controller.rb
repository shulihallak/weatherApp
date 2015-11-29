class WeathersController < ApplicationController

  before_action :require_current_user

  def index
    @weathers = current_user.weathers
  end

  def create
    @weather = current_user.weather.new(weather_params)

    if@weather.save

    else
      render json: {
        error: {
          message: @weather.errors.full_messages.to_sentence
        }
      }
    end
  end

  def edit

  end

  def update

  end

  private

  def weather_params
    params.require(:weather).permit(:zipcode, :id)
  end

end
