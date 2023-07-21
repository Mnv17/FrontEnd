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
          Authorization: token,
        },
      };

      const response = await axios.get(
        "https://lively-woolens-cod.cyclic.app/cars",
        config
      );
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
          Authorization: token,
        },
      };

      await axios.delete(
        `https://lively-woolens-cod.cyclic.app/cars/delete/${id}`,
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
        <ul>
          {cars.map((car) => (
            <li key={car._id}>
              <p>Car Name: {car.name}</p>
              <p>Car Model: {car.model}</p>
              <p>Car Year: {car.year}</p>
              <button onClick={() => handleDelete(car._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/cars/create">Create a new car</Link>
    </div>
  );
};

export default CarList;
