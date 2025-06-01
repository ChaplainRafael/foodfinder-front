import React from'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const RegisterAndLogin = ()=>{
    const [page,setPage]= useState("login");
    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // i shouldnt be repeating this but its late and i dont care for one mistake 

    const RegisterForm = ()=>{
        const [username,setUsername]= useState('');
        const [password, setPassword] = useState('');

        const handleRegister=async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post(`${API_BASE_URL}/api/auth/register`,{username,password});
                toast.success(res.data.message);
            } catch (error) {
                    if (error.response.data.message) {
                    toast.error(error.response.data.message); 
                    } else {
                    toast.error("Something went wrong!");
                    }
                    console.log(error);
                }
        };

        return (
        <div className='auth-wrapper'>

            <img src='login-cat.png' alt='login-cat' />

            <div className='auth-form'>
            <form onSubmit={handleRegister}>
                <div className='logo'><img src='food_finder_logo.png' alt='logo' /></div>
                <p>Hello New Friend Welcome To <strong>Food Finder!</strong></p>
                <h3>Register</h3>

                <label htmlFor="username">Username</label>
                <input
                id="username"
                type="text"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />

                <label htmlFor="password">Password</label>
                <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button type="submit">Register</button>
                <button onClick={() => setPage('login')}>Go to Login</button>

            </form>
            </div>
        </div>
        );

    };

    const LoginForm=()=>{
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const navigate = useNavigate();

        const handleLogin=async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post(`${API_BASE_URL}/api/auth/login`,{username,password});
                localStorage.setItem('token',res.data.token);
                toast.success("Login successful!");

                navigate('/')
            } catch (error) {
                toast.error("Invalid credentials.");
                console.error(error);
            }


        }

        return(
        <div className='auth-wrapper'>

            <img src='login-cat.png' alt='login-cat'/>
            <div className='auth-form'>
                <form onSubmit={handleLogin}>
                    <div className='logo'><img src='food_finder_logo.png' alt='logo'/></div>
                    <p>Welcome To <strong>Food Finder!</strong></p>
                    <h3>Login</h3>
                    <label htmlFor="username">Username</label>
                    <input id='username' type='text' placeholder='Enter Your Username' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                    <label htmlFor="password">Password</label>
                    <input id='password' type="text" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <button type='submit'>Login</button>
                    <button onClick={() => setPage('register')}>Go to Register</button>

                </form>
            </div>
        </div>
        )
    }
    
    
    
    
    return(<>
        {page==='login'?<LoginForm/>:<RegisterForm/>}
    </>)
}

export default RegisterAndLogin;