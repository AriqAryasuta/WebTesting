import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

import { Login } from "./pages/login";
import Mainpage from "./pages/mainpage";

function App() {
  const {user} = useAuthContext();
  console.log(user)
  return (
    <>
      <div className="max-w-screen flex-row sm:flex">
        <div className='sm:overflow-y-scroll relative w-screen'>
          <Router>
            <Routes>
              <Route exact path="/*" element={!user? <Login /> : <Mainpage/>} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
