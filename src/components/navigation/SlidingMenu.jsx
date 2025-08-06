import { Link } from 'react-router-dom';
import '../../styles/slidingMenu.css';
import { useRef, useEffect } from "react";

const SlidingMenu = ({active, setActive})  => {
    const containerRef = useRef(null);

    const handleClose = e => {
        const sameRef = e.relatedTarget;
        if (!containerRef.current.contains(sameRef)) setActive(false);
    }

    useEffect(() => {
        if (active && containerRef.current) {
            containerRef.current.focus();
        }
    },[active]);


    return (
      <>
      <div 
      className={`sliding-menu ${active ? 'open' : 'closed'}`}
      ref={containerRef}
      onBlur={handleClose}
      tabIndex={0}
      >
       <button onClick={() => setActive(false)}>close</button>
            <Link to={'/bids'}  className="nav-link">
            <button className="nav-button">
                Bids
            </button>
            </Link>
            <Link to={'/collections'}  className="nav-link">
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

