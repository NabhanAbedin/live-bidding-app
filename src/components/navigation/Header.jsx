import Nav from "./nav";
import SearchBids from "../searchBids/SearchBids";
import '../../styles/Header.css';
import { useState } from "react";
import hambugerIcon from '../../assets/hamburgerIcon.png';
import SlidingMenu from "./SlidingMenu";

const Header = () => {
    const [active, setActive] = useState(false);


    return (
    <div className="header-container">
        <div className="button-container">
            <button>
                <img 
                    src={hambugerIcon}
                    alt="logo" 
                    className="logo"
                    onClick={() => setActive(!active)}
                />
            </button>
        </div>
        {active && <SlidingMenu active={active} setActive={setActive}/>}
        <SearchBids/>
        <Nav/>
    </div>
    )
}

export default Header;