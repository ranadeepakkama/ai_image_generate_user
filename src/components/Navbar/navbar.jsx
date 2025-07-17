import {logOut} from '../userReducer/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import './style.css'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickLogOut = () => {
        dispatch(logOut())
        navigate('/login')
    }

    return(
        <div className='nav-container'>
            <h1 className='main-header'>Ai_Image</h1>
            <button className='btn btn-primary' type='button' onClick={onClickLogOut}>LogOut</button>
        </div>
    )
}

export default Navbar