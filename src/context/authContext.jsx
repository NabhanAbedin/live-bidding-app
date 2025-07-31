import {createContext, useContext, useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {getUser} from '../api/authApi';


const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [user, setUser] = useState(null);

    const {data: userData, isLoading, isError, error} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 0
})

    useEffect(()=> {
        if (userData) {
            setUser({
                id: userData.id,
                username: userData.username
            })
        }
    },[userData]);

    const clientLogIn = (userData) => {
        setUser(userData);
    }

    const clientLogOut = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,clientLogIn, clientLogOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}