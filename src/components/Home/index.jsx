import Navbar from "../Navbar/navbar"
import './style.css'
import ImageUploadAndConvert from '../Upload&ConvertImage/index'

const Home = () => {
    return(
        <div className="main-component">
            <Navbar/>
            <div className="image-component">
                <ImageUploadAndConvert/>
            </div>
            
        </div>
    )
}

export default Home