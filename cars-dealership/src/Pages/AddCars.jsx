import React, { useState } from 'react';
import axios from 'axios';
import CarListing from './CarList';
import "./AddCars.css";
import { Link } from 'react-router-dom';

const AddCars = () => {
  const [carImage, setCarImage] = useState('');
  const [carTitle, setCarTitle] = useState('');
  const [colors, setColors] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [bulletPoints, setBulletPoints] = useState(['', '', '', '', '']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carDetailsData = {
      image: carImage,
      title: carTitle,
      description: bulletPoints.filter((point) => point !== ''),
      colors,
      price,
      mileage,
    };

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://attryb-88g8.onrender.com/cars/create',
        carDetailsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsLoading(false);
      console.log('Car details added successfully!', response.data);
      setCarImage('');
      setCarTitle('');
      setColors('');
      setPrice('');
      setMileage('');
      setBulletPoints(['', '', '', '', '']);
    } catch (error) {
      console.error('Error adding car details:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
     <Link to="/cars" className="car-select">
        Select your car here
      </Link>
    <div className="add-cars-container">
      <h1 className="add-cars-title">Add Second-Hand Car Details</h1>
      <form onSubmit={handleSubmit} className="add-cars-form">
        <div className="add-cars-form-item">
          <label>Car Image URL:</label>
          <input
            type="text"
            value={carImage}
            onChange={(e) => setCarImage(e.target.value)}
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Car Title:</label>
          <input
            type="text"
            value={carTitle}
            onChange={(e) => setCarTitle(e.target.value)}
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Bullet Point 1:</label>
          <input
            type="text"
            value={bulletPoints[0]}
            onChange={(e) =>
              setBulletPoints([e.target.value, ...bulletPoints.slice(1)])
            }
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Bullet Point 2:</label>
          <input
            type="text"
            value={bulletPoints[1]}
            onChange={(e) =>
              setBulletPoints([bulletPoints[0], e.target.value, ...bulletPoints.slice(2)])
            }
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Bullet Point 3:</label>
          <input
            type="text"
            value={bulletPoints[2]}
            onChange={(e) =>
              setBulletPoints([bulletPoints[0], bulletPoints[1], e.target.value, ...bulletPoints.slice(3)])
            }
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Bullet Point 4:</label>
          <input
            type="text"
            value={bulletPoints[3]}
            onChange={(e) =>
              setBulletPoints([bulletPoints[0], bulletPoints[1], bulletPoints[2], e.target.value, ...bulletPoints.slice(4)])
            }
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Bullet Point 5:</label>
          <input
            type="text"
            value={bulletPoints[4]}
            onChange={(e) => setBulletPoints([...bulletPoints.slice(0, 4), e.target.value])}
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Car Color:</label>
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Car Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="add-cars-input"
            required
          />
        </div>
        <div className="add-cars-form-item">
          <label>Car Mileage:</label>
          <input
            type="text"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className="add-cars-input"
            required
          />
        </div>
        {isLoading ? <button type="submit" className="add-cars-button">
          Loading ....
        </button> : <button type="submit" className="add-cars-button">
          Add Car Details
        </button>}
      </form>
     
    </div>
    </>
  );
};

export default AddCars;
