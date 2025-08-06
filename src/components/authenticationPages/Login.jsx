import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../api/authApi";
import FormInput from "./FormInput";
import '../../styles/authenticationPages.css';
import InvalidCredentials from "./InvalidCredentials";


const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const {user,clientLogIn, authLoading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;
        if (user) navigate('/');
    },[user])

    const {mutate, isLoading, isError, error} = useMutation({
        mutationFn: () => userLogin(formData),
        onSuccess: (userPayload) => {
            clientLogIn(userPayload);
            navigate('/')
        }
    }
    )

    if (error) {
        console.log(error);
    }
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
                <h1>Log in</h1>
            </div>
           <FormInput name={'username'} valueType={formData.username} handleChange={handleChange} />
           <FormInput name={'password'} valueType={formData.password} handleChange={handleChange} />
          <button type="submit">Log in</button>
          <div className="create-container">
            <p>Dont Have an account with us? create one <Link to='/register'>
            here
            </Link></p>
            {error && (
                <InvalidCredentials />
            )}
            </div>
        </form>
    )
}

export default Login;