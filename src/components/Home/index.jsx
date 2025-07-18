import Navbar from "../Navbar/navbar"
import './style.css'
import ImageUploadAndConvert from '../Upload&ConvertImage/index'
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();

const Home = () => {
    const examplesList = ["A close-up photo of coffee beans","A photo of a forest canopy with blue skies from below","a polaroid portrait of a dog wearing sunglasses","a duffle bag made of cheese"]



    return(
        <div className="main-component">
            <Navbar/>
            <div className="image-component">
                <ImageUploadAndConvert/>
            </div>
            <div className="example-prompt-container">
                <p className="example-header">U can try Examples Prompts Like:</p>
                <ul>
                    {examplesList.map(prompt => (
                        <li key={id}>{prompt}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default Home