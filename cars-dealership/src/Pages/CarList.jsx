import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:8080/cars",
        config
      );
      // console.log(response.data.cars)
      setCars(response.data.cars);
    } catch (error) {
      // console.error("Error fetching cars:", error.message); 
      setError("Error fetching cars");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:8080/cars/delete/${id}`,
        config
      );
      getCars(); 
    } catch (error) {
      console.error("Error deleting car:", error.response); 
      setError("Error deleting car");
    }
  };

  // const navigate = useNavigate();

  return (
    <div>
      <h1>Car List</h1>
      {error && <p>{error}</p>}
      {cars.length === 0 ? (
        <p>No cars available</p>
      ) : (
      <div>
          {cars.map((car) => (
            <li key={car._id}>
              <img src={car.image}/>
              <p>Car Name: {car.title}</p>
              <ul>
                <p>Car Description:</p>
                <li>
                 {car.description[0]}
                </li>
                <li>
                {car.description[1]}
                </li>
                <li>
                {car.description[2]}
                </li>
                <li>
                {car.description[3]}
                </li>
                <li>
                {car.description[4]}
                </li>
              </ul>
              <p>Car Color: {car.colors}</p>
              <p>Car Mileage: {car.mileage}</p>
              <p>Car Price: {car.price}</p>
              <button onClick={() => handleDelete(car._id)}>Delete</button>
            </li>
          ))}
        </div>
      )}
      <Link to="/cars/create">Create a new car</Link>
    </div>
  );
};

export default CarList;
