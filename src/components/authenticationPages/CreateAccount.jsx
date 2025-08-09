import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../../api/authApi";
import '../../styles/authenticationPages.css';
import InvalidCredentials from "./InvalidCredentials";


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const {clientLogIn} = useAuth();
    const navigate = useNavigate();

    const {mutate, isLoading, isError, error} = useMutation({
        mutationFn: () => userRegister(formData),
        onSuccess: (userPayload) => {
            clientLogIn(userPayload);
            navigate('/')
        }
    }
    )
    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.password.trim() === formData.confirmPassword.trim()) {
            mutate();
        } else {
            alert('passwords dont match');
        }
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
    }

    return (
        <form onSubmit={handleSubmit} className="authentication-form">
            <div className="form-header">
                <h1>Create Account</h1>
            </div>
            <div>
                <label htmlFor={'username'}>Username:</label>
                <input 
                type="text"
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                    />     
            </div>
            <div>
                <label htmlFor={'password'}>Password:</label>
                <input 
                type="password"
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                    />     
            </div>
            <div>
                <label htmlFor={'confirmPassword'}>Confirm password:</label>
                <input 
                type="password"
                id='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                    />     
            </div>
          <button type="submit">Create account</button>
          <div className="create-container">
            <p>Have an account? log in <Link to='/login'>
            here
            </Link></p>
            {error && (
                <InvalidCredentials />
            )}
            </div>
        </form>
    )
}

export default Register;