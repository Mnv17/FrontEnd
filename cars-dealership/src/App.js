// import './App.css'
import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCars from "./Pages/AddCars";
import CarList from "./Pages/CarList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/users/login" element={<Login/>}/>
          <Route path="/users/signup" element={<Signup/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/cars/create" element={ <AddCars/> }/>
          <Route path="/cars" element= { <CarList/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;