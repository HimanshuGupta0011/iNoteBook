import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [creds, setCreds] = useState({ name:"", email: "", password: "", cpass:"" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password})
        })
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authtoken)
            navigate("/");
        } else{
           alert(json.error) 
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={creds.name} onChange={onChange} name="name" type="name" className="form-control" id="name" minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={creds.email} onChange={onChange} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={creds.password} onChange={onChange} name="password" type="password" className="form-control" id="password" minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpass" className="form-label">Confirm Password</label>
                    <input value={creds.cpass} onChange={onChange} name="cpass" type="password" className="form-control" id="cpass" minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signin