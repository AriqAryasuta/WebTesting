import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "../components/public/Navbar";
import Map from "./map";

const Mainpage = () => {
  return (
    <div className="max-w-screen flex-row sm:flex">
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path='/' element={<Map/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Mainpage;
