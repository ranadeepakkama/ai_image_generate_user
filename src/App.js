import Login from "./components/Login/login";
import Home from "./components/Home";
import { BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>  
      </Routes>
    </Router>
  )
}

export default App