import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../api/authApi";



const Nav = () => {
    const navigate = useNavigate();
    const {user, clientLogOut, authLoading} = useAuth();
    const qc = useQueryClient();

    const {mutate, isLoading, isError, error} =useMutation({
        mutationFn: logOut,
        onSuccess: () => {
          clientLogOut();
          navigate('/');
          qc.clear();
        },
        onError: (err) => {
          console.error(err);
        },
      });

    const handleLogOut = async () => {
        mutate();
    }

    if (authLoading) return;
    
    return (
        <div className="nav-container">
            {!user ? (
            <>
            <Link to={'/Login'} className="nav-link">
                <button className="nav-button">
                    Log In
                </button>
                </Link>
                <Link to={'/register'}  className="nav-link">
                <button className="nav-button">
                    Sign up
                </button>
            </Link>
            </>
            ) : (
            <>
             <div className="nav-link">
                <button className="nav-button" onClick={handleLogOut}>
                        Log Out
                </button>
             </div>
            </>
            )}
            <Link to={'/'}  className="nav-link">
            <button className="nav-button">
                Home
           </button>
            </Link>
        </div>
    )
}

export default Nav;

