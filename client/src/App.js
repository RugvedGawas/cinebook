import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import "./stylesheets/theme.css";
import "./stylesheets/alignment.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/custom.css";
import "./stylesheets/sizes.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import TheatresForMovie from "./pages/TheatresForMovie";
import BookShow from "./pages/BookShow";


function App() {
  const {loading} = useSelector((state => state.loaders));


  return (
    <div>
    
  {loading && (
    <div className="loader-parent">
      <div className="loader"></div>
    </div>  
  )}
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/movie/:id" element={<ProtectedRoute><TheatresForMovie /></ProtectedRoute>}/>
        <Route path="/book-show/:id"element={<ProtectedRoute><BookShow /></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
