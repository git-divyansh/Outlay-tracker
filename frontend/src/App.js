import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<Register></Register>}/>
        <Route path="/login" element = {<Login></Login>}/>
        <Route path="/home" element = {<Home></Home>}/>
      </Routes>
    </div>
  );
}

export default App;
