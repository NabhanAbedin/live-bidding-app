import {createContext, useContext, useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {getUser} from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [user, setUser] = useState(null);

    const {data: userData, isLoading: authLoading, isError, error} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 0
    })

    console.log(user);

    useEffect(() => {
        if (userData) {
          setUser({ id: userData.id, username: userData.username, currency: userData.currency });
        } else if (isError && !authLoading && !userData) {
            setUser(null);
        }
      }, [userData, isError, authLoading]);

    const clientLogIn = (userData) => {
        setUser({ id: userData.id, username: userData.username, currency: userData.currency });
    }

    const clientLogOut = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,clientLogIn, clientLogOut, authLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}