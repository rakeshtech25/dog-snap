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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dog-breed">Breed:</label>
        <input type="text" id="dog-breed" name="dog-breed" value={breed} onChange={(e) => setBreed(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>

      {image && <img src={image} alt="Dog" />}
    </div>
  )
}

export default DogBreedForm
