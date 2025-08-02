import { Link } from 'react-router-dom';
import '../../styles/slidingMenu.css';

const SlidingMenu = ({active, setActive})  => {
    return (
      <>
      <div className={`sliding-menu ${active ? 'open' : 'closed'}`}>
       <button onClick={() => setActive(false)}>close</button>
            <Link to={'/bids'}  className="nav-link">
            <button className="nav-button">
                Bids
            </button>
            </Link>
            <Link to={'/users/collections'}  className="nav-link">
            <button className="slidemenu-button">
                Collections
            </button>
            </Link>
            <Link to={'/users/financials'}  className="nav-link">
            <button className="slidemenu-button">
                Financials
            </button>
            </Link>
            <Link to={'/users/favorites'}  className="nav-link">
            <button className="slidemenu-button">
                Favorites
            </button>
            </Link>
            <Link to={'/bids/create'} className="nav-link">
            <button className="post-bid-button">
                Post bid
            </button>
            </Link>
      </div>
      </>
    );
  }


export default SlidingMenu;

