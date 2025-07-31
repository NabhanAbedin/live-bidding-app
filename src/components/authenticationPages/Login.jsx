import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../api/authApi";
import FormInput from "./FormInput";


const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const {clientLogIn} = useAuth();
    const navigate = useNavigate();

    const {mutate, isLoading, isError, error} = useMutation({
        mutationFn: () => userLogin(formData),
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
        <form onSubmit={handleSubmit}>
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
            </div>
        </form>
    )
}

export default Login;