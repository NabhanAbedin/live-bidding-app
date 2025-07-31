import Nav from "./nav";
import SearchBids from "../searchBids/SearcBids";
import '../../styles/Header.css';

const Header = () => {
    return (
    <div className="header-container">
        <SearchBids/>
        <Nav/>
    </div>
    )
}

export default Header;