import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import MyWallet from "./MyWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../../styles/financials.css';
import PurchaseCurrency from "./PurchaseCurrency";


const Financials = () => {
    const {user, authLoading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !authLoading) {
            navigate('/login');
        }
    },[user,authLoading])

    return (
        <>
        <div className="financials-container">
            <MyWallet user={user} authLoading={authLoading}/>
            <div className="statistics-container">
        
            </div>
           
        </div>
         <PurchaseCurrency />
        </>
    )
}

export default Financials;