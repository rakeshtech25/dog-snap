require 'rails_helper'

RSpec.describe Api::DogsController, type: :controller do
  describe "GET #fetch_image" do
    context "with valid breed" do
      let(:breed) { "african" }
      let(:image_url) { "https://example.com/african.jpg" }

      before do
        allow_any_instance_of(DogBreed).to receive(:call).and_return({ 'message' => image_url, 'status' => 'success' })
        get :fetch_image, params: { breed: breed }
      end

      it "returns a success response" do
        expect(response).to have_http_status(:ok)
      end

      it "returns the image URL" do
        expect(JSON.parse(response.body)['image_url']).to eq(image_url)
      end
    end

    context "with invalid breed" do
      let(:breed) { "invalid_breed" }

      before do
        allow_any_instance_of(DogBreed).to receive(:call).and_return({ 'message' => 'Breed not found', 'status' => 'error' })
        get :fetch_image, params: { breed: breed }
      end

      it "returns a not found response" do
        expect(response).to have_http_status(:not_found)
      end

      it "returns an error message" do
        expect(JSON.parse(response.body)['error']).to eq('Breed not found')
      end
    end
  end
end
