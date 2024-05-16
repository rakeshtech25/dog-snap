import React, { useState } from "react"
import axios from "axios"

const DogBreedForm = () => {
  const [breed, setBreed] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!breed.trim()) {
      alert("Please enter a breed")
      return;
    }

    try {
      const response = await axios.get('/api/dogs/fetch_image', { params: { breed } })
      setImage(response.data.image_url)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.error)
      } else {
        alert('Something went wrong, please try again later')
      }
    }
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="dog-breed" className="block text-gray-700 font-bold mb-2">Breed:</label>
          <input type="text" id="dog-breed" name="dog-breed" className="border border-gray-300 rounded-md p-2 mr-2 w-80" value={breed} onChange={(e) => setBreed(e.target.value)}/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
        </form>
      </div>

      <div className="w-1/4 p-4 flex justify-center items-center">{image && <img src={image} alt="Dog" className="rounded-md shadow-md max-w-full h-auto"/>}</div>
    </div>
  )
}

export default DogBreedForm
