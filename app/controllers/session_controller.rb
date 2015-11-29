class SessionController < ApplicationController

  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])

      token = SecureRandom.urlsafe_base64
      # session[:current_user_id] = user.id
      session[:session_token] = token
      user.update(session_token: token)

      flash[:message] = "You're now logged in!"

      redirect_to  application_angular_path

    else
      flash[:message] = "Email / password combination is invalid"
      redirect_to root_path
    end

  end

  def log_out
    session[:session_token] = nil
  end

  def destroy
    log_out!
    redirect_to root_path
  end

  def current_user

  end

  private
  def user_params
    return params.require(:user).permit(:email, :password)
  end
end
