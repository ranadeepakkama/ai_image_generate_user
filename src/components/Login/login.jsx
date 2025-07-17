import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import {loginUser} from '../userReducer/userReducer'
import { auth, googleProvider } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import './style.css'



const Login = () => {
    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')
    const {loading,error} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser){
                navigate('/home')
            }
        })
        return () => unsubscribe()
    }, [navigate])

    const onClickButton = () => {
        dispatch(loginUser({user,password}))
    }

    const onClickGoogleSignIn = async () => {
        try{
            const result = await signInWithPopup(auth,googleProvider)
            console.log("user: ", result.user)
        }catch(e){
            console.log("error", e.message)
        }
    }
    return(
        <div className="main-container">
            <div className="register-container">
                <h3>SignIn / Login</h3>
                <div className="sign-container">
                    <input type="text" 
                        className="input"
                        placeholder="Enter Email"
                        required
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <input type="password" 
                        placeholder="Enter Password"
                        required
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="btn btn-primary" disabled={loading} onClick={onClickButton}>Login</button>
                    {error && <p>{error}</p>}
                </div>
                <div>
                    <button onClick={onClickGoogleSignIn} className="btn"><FcGoogle className="google-btn"/></button>
                </div>
            </div>
        </div>
    )
}

export default Login