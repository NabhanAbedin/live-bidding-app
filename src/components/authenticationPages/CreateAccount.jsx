import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../../api/authApi";
import FormInput from "./FormInput";
import '../../styles/authenticationPages.css';
import InvalidCredentials from "./InvalidCredentials";


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const {clientLogIn} = useAuth();
    const navigate = useNavigate();

    const {mutate, isLoading, isError, error} = useMutation({
        mutationFn: () => userRegister(formData),
        onSuccess: () => {
            clientLogIn(formData);
            navigate('/')
        }
    }
    )
    const handleSubmit = async e => {
        e.preventDefault();
        mutate();
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
           <FormInput name={'username'} valueType={formData.username} handleChange={handleChange} />
           <FormInput name={'password'} valueType={formData.password} handleChange={handleChange} />
          <button type="submit">Log in</button>
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