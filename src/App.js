
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
  <>
   <BrowserRouter>
   <ToastContainer />
      <>
        <Header/>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </>
    </BrowserRouter>
  </>
  );
}

export default App;
