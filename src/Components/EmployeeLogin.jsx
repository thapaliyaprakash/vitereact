import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Reset error on each submit
        setError(null);
        
        try {
            console.log('Sending login request with:', values);
            
            // Send the request
            const result = await axios.post('http://localhost:3000/employee/employee_login', values);
            
            console.log('Server response:', result.data);

            // Handle the result
            if (result.data.loginStatus) {
                console.log('Login successful');
                localStorage.setItem("valid", true);
                navigate(`/employee_detail/${result.data.id}`);
            } else {
                console.error('Login failed:', result.data.Error);
                setError(result.data.Error || 'Login failed');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                {error && <div className='text-danger mb-3'>{error}</div>}
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input 
                            type="email" 
                            name='email' 
                            autoComplete='off' 
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} 
                            className='form-control rounded-0' 
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} 
                            className='form-control rounded-0' 
                            required
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input 
                            type="checkbox" 
                            name="tick" 
                            id="tick" 
                            className='me-2' 
                        />
                        <label htmlFor="tick">You agree to the terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLogin;
