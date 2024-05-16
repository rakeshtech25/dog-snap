import React, { useState } from 'react';
import { ERROR_MESSAGE } from '../../constants/errorMessage';
import { fetchBreed } from '../../services/getBreed';
import Loader from './Loader';

const DogBreedForm = () => {
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!breed.trim()) {
      alert(ERROR_MESSAGE.EMPTY_BREED);
      return;
    }

    setIsLoading(true);
    const image = await fetchBreed(breed);
    setIsLoading(false);
    setImage(image);
  };

  return (
    <div className='w-1/2 mx-auto mt-8'>
      <div className='flex border-2 border-black gap-3 min-h-80'>
        <div className='w-1/2 p-4 flex items-center'>
          <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="dog-breed" className="block text-gray-700 font-bold mb-2">Breed</label>
            <input type="text"
                   id="dog-breed"
                   name="dog-breed"
                   className="border border-gray-300 rounded-md p-2 mr-2 w-80"
                   value={breed} onChange={(e) => setBreed(e.target.value)
            }/>
            <button type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    disabled={isLoading}>Submit</button>
          </form>
        </div>

        <div className="w-1/2 p-4 flex justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {image && (
                <img
                  src={image}
                  alt="Dog"
                  className="rounded-md shadow-md max-w-full object-fit"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DogBreedForm;