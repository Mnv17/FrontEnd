import React from "react"
import {Link, useLocation, useNavigate} from 'react-router-dom';
import AddCars from "../Pages/AddCars";

function Home (){
    const location=useLocation()
    const navigate = useNavigate();

    const handleButton = (e) => {
        e.preventDefault();
        navigate("/cars/create");
    }

    

    return (
        <div className="homepage">

            <h1>Hello and welcome</h1>
            <h1>lets choose your dream car</h1>
            <div>
                <button onClick={handleButton}>All Cars</button>
                <Link to="/users/login">Login!!</Link>

            </div>

        </div>
    )
}


export default Home