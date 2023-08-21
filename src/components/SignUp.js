import React,{useState} from 'react'

const SignUp = () => {

  const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if ( json.success ){
            // Save the authtoken and redirect
            localStorage.setItem('token',json.authToken);
            Navigate('/'); // To redirect the page after successful signup
        }   
        else{
            alert(' Invalid Credentials');
        }       

    } catch (error) {
        console.log('Error', error);
    }
}

  const onChange = (e) => {
    // Use e.target.name to access the field name (email or password) and e.target.value for the value
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control"  onChange={onChange} id="name" name="name" minLength={5} aria-describedby="emailHelp"  required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" autoComplete='username' onChange={onChange} id="email" name="email" minLength={4} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" autoComplete='current-password' className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" autoComplete='current-password' onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
