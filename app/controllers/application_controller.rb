class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  helper_method :current_user

  def login
    render '/login'
  end

  def angular
    render 'layouts/angular'
  end

  private

  def current_user

    # @current_user ||= session[:current_user_id] &&
    # User.find(session[:current_user_id])
    if session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    else
      @current_user = nil
    end
  end


  def log_out!
    session[:session_token] = nil
  end


  def require_current_user
    redirect_to root_path unless current_user
  end
end
