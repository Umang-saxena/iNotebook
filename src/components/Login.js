import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const onChange = (e) => {
        // Use e.target.name to access the field name (email or password) and e.target.value for the value
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            console.log(json);
            if ( json.success ){
                // Save the authtoken and redirect
                localStorage.setItem('token',json.authToken);
                props.showAlert("Logged in Succesfully","success");
                navigate('/'); // To redirect the page after successful signup

            }   
            else{
                props.showAlert("Invalid Credentials","danger");
            }       

        } catch (error) {
            console.log('Error', error);
        }
    }
    return (
        <div className="container">
            <h2 className='mt-3' >Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login