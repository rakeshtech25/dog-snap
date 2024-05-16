class Api::DogsController < ApplicationController
  def fetch_image
    breed = URI.encode_www_form_component(params[:breed].downcase)
    response = HTTParty.get("https://dog.ceo/api/breed/#{breed}/images/random")

    if response.success?
      render json: { image_url: response['message'] }
    else
      render json: { error: response['message'] }, status: :not_found
    end
  end
end
