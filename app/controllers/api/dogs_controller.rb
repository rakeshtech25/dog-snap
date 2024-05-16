module Api
  class DogsController < ApplicationController
    def fetch_image
      breed_name = URI.encode_www_form_component(params[:breed].downcase)
      response = DogBreed.new(breed_name).call

      if response['status'] == 'success'
        render json: { image_url: response['message'] }
      else
        render json: { error: response['message'] }, status: :not_found
      end
    end
  end
end
