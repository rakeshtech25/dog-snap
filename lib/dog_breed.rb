class DogBreed
  BASE_URL = 'https://dog.ceo/api/breed'
  attr_reader :breed_name

  def initialize(breed_name)
    @breed_name = breed_name
  end

  def call
    response = HTTParty.get("#{BASE_URL}/#{breed_name}/images/random")
    JSON.parse(response.body)
  end
end
