import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/index";
import Home from "./components/Home";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App