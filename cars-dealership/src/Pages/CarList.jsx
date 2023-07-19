import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('https://lively-woolens-cod.cyclic.app/cars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });

  
  }, []);

  return (
    <div>
      <h1>Second-Hand Cars Listing</h1>
      {isLoggedIn ? (
        cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id}>
              <img src={car.image} alt={car.title} />
              <h3>{car.title}</h3>
              <ul>
                {car.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <p>Color: {car.colors}</p>
              <p>Price: {car.price}</p>
              <p>Mileage: {car.mileage}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )
      ) : (
        <p>Please log in to view the car listing.</p>
      )}
    </div>
  );
};

export default CarListing;
