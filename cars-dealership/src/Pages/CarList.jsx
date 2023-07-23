import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CarList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [editingCarId, setEditingCarId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    color: "",
    price: "",
    mileage: "",
  });

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      setIsLoading(true);
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
        "https://attryb-88g8.onrender.com/cars",
        config
      );
      setCars(response.data.cars);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching cars");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
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
        `https://attryb-88g8.onrender.com/cars/delete/${id}`,
        config
      );
      getCars();
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting car:", error.response);
      setError("Error deleting car");
      setIsLoading(false);
    }
  };
  console.log(isLoading);

  const handleEdit = (id) => {
    setEditingCarId(id);
  };

  const handleCancelEdit = () => {
    setEditingCarId(null);
  };

  const handleSaveChanges = async (id) => {
    try {
      setIsLoading(true);
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

      const carToUpdate = cars.find((car) => car._id === id);
      if (!carToUpdate.title || !carToUpdate.price) {
        setError("Car title and price cannot be empty");
        return;
      }

      const updatedCarData = {
        title: carToUpdate.title,
        price: carToUpdate.price,
        mileage: carToUpdate.mileage, 
      };

      const response = await axios.patch(
        `https://attryb-88g8.onrender.com/cars/update/${id}`,
        updatedCarData,
        config
      );
      setIsLoading(false);

      if (response.status === 200) {
        setCars((prevCars) =>
          prevCars.map((car) => (car._id === id ? { ...car, ...updatedCarData } : car))
        );

        setEditingCarId(null);
      } else {
        setError("Failed to update car");
      }
    } catch (error) {
      console.error("Error updating car:", error.response);
      setError("Error updating car");
      setIsLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterCars = (cars) => {
    return cars.filter((car) => {
      return (
        car.colors.toLowerCase().includes(filters.color.toLowerCase()) &&
        (!filters.price || car.price <= parseFloat(filters.price)) &&
        (!filters.mileage || car.mileage <= parseFloat(filters.mileage))
      );
    });
  };

  const token = localStorage.getItem("token")

  return (
    <>
      <h1 className="car-list-title">Car List</h1>
      <div className="car" style={{display:token ? "inline" : "none"}}>
        <h3 className="addCar">Want to add some Cars</h3>
        <Link to="/cars/create" className="car-list-create-link" >
          Create a new car
        </Link>
      </div>
      <div className="car-list-container">
        {error && <p className="car-list-error">{error}</p>}
        <div className="filter-container">
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </label>
          <label>
            Price (max):
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </label>
          <label>
            Mileage (max):
            <input
              type="number"
              name="mileage"
              value={filters.mileage}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </label>
          <button onClick={() => setFilters({ color: "", price: "", mileage: "" })} className="filter-clear-button">
            Clear Filters
          </button>
        </div>
        {filterCars(cars).length === 0 ? (
          <p>No cars available</p>
        ) : (
          <div className="car-list-items">
            {filterCars(cars).map((car) => (
              <div key={car._id} className="car-list-item">
                {editingCarId === car._id ? (
                  <div>
                    <input
                      type="text"
                      value={car.title}
                      onChange={(e) =>
                        setCars((prevCars) =>
                          prevCars.map((prevCar) => (prevCar._id === car._id ? { ...prevCar, title: e.target.value } : prevCar))
                        )
                      }
                    />
                    <input
                      type="number"
                      value={car.price}
                      onChange={(e) =>
                        setCars((prevCars) =>
                          prevCars.map((prevCar) => (prevCar._id === car._id ? { ...prevCar, price: e.target.value } : prevCar))
                        )
                      }
                    />
                    {isLoading ? <button >
                      Loading ....
                    </button> : <button onClick={() => handleSaveChanges(car._id)}>
                      Save Changes
                    </button>}
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <img
                      src={car.image}
                      alt={car.title}
                      className="car-list-image"
                    />
                    <p className="car-list-item-title">Car Name: {car.title}</p>
                    <ul className="car-list-description">
                      <p>Car Description:</p>
                      {car.description.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    <p>Car Color: {car.colors}</p>
                    <p>Car Mileage: {car.mileage}</p>
                    <p>Car Price: {car.price}</p>
                    <div className="car-list-button-container">
                      {isLoading ? <button
                        className="car-list-delete-button"
                      >
                        Loading ....
                      </button> : <button
                        onClick={() => handleDelete(car._id)}
                        className="car-list-delete-button"
                      >
                        Delete
                      </button>}
                      {isLoading ? <button
                        className="car-list-edit-button"
                      >
                        Loading ....
                      </button> : <button
                        onClick={() => handleEdit(car._id)}
                        className="car-list-edit-button"
                      >
                        Edit
                      </button>}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to="/users/login" className="signup-link">
        Already have an account? Login
      </Link>
    </>
  );
};

export default CarList;
