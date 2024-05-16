import React from 'react';
import { createRoot } from 'react-dom/client';
import DogBreedForm from './react/components/DogBreedForm';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(<DogBreedForm />);
});
