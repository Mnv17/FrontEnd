import React, { useState } from 'react';
import axios from 'axios';
import CarListing from './CarList';

const AddCars = () => {
  const [carImage, setCarImage] = useState('');
  const [carTitle, setCarTitle] = useState('');
  const [colors, setColors] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');

  const [bulletPoints, setBulletPoints] = useState(['', '', '', '', '']);

  const handleSubmit = (e) => {
    e.preventDefault();

    const carDetailsData = {
      carImage,
      carTitle,
      bulletPoints: bulletPoints.filter(point => point !== ''), 
      colors,
      price,
      mileage,
    };

    axios.post('https://lively-woolens-cod.cyclic.app/create', carDetailsData)
      .then((response) => {
        console.log('Car details added successfully!', response.data);
        setCarImage('');
        setCarTitle('');
        setColors('');
        setPrice('');
        setMileage('');
        setBulletPoints(['', '', '', '', '']);
      })
      .catch((error) => {
        console.error('Error adding car details:', error);
      });
  };

  return (
    <div>
      <h1>Add Second-Hand Car Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Image URL:</label>
          <input type="text" value={carImage} onChange={(e) => setCarImage(e.target.value)} required />
        </div>
        <div>
          <label>Car Title:</label>
          <input type="text" value={carTitle} onChange={(e) => setCarTitle(e.target.value)} required />
        </div>
        <div>
          <label>Bullet Point 1:</label>
          <input type="text" value={bulletPoints[0]} onChange={(e) => setBulletPoints([e.target.value, ...bulletPoints.slice(1)])} required />
        </div>
        <div>
          <label>Bullet Point 2:</label>
          <input type="text" value={bulletPoints[1]} onChange={(e) => setBulletPoints([bulletPoints[0], e.target.value, ...bulletPoints.slice(2)])} required />
        </div>
        <div>
          <label>Bullet Point 3:</label>
          <input type="text" value={bulletPoints[2]} onChange={(e) => setBulletPoints([bulletPoints[0], bulletPoints[1], e.target.value, ...bulletPoints.slice(3)])} required />
        </div>
        <div>
          <label>Bullet Point 4:</label>
          <input type="text" value={bulletPoints[3]} onChange={(e) => setBulletPoints([bulletPoints[0], bulletPoints[1], bulletPoints[2], e.target.value, ...bulletPoints.slice(4)])} required />
        </div>
        <div>
          <label>Bullet Point 5:</label>
          <input type="text" value={bulletPoints[4]} onChange={(e) => setBulletPoints([...bulletPoints.slice(0, 4), e.target.value])} required />
        </div>
        <div>
          <label>Car Color:</label>
          <input type="text" value={colors} onChange={(e) => setColors(e.target.value)} required />
        </div>
        <div>
          <label>Car Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Car Mileage:</label>
          <input type="text" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
        </div>
        <button type="submit">Add Car Details</button>
      </form>
      <CarListing />
    </div>
  );
};

export default AddCars;
