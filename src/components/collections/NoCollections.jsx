import '../../styles/collections.css';
import { Link } from 'react-router-dom';

const NoCollections = () => {
  return (
    <div className="no-collections">
      <div className="no-collections-card">
        <div className="no-collections-icon" aria-hidden="true">
          {/* folder/collection glyph */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h4.086c.464 0 .909.184 1.237.512l1.172 1.172c.328.328.773.516 1.237.516H19.25A1.75 1.75 0 0 1 21 8.95v8.3A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="no-collections-title">No collections yet</h2>
        <p className="no-collections-subtitle">Start winning bids and see your results here</p>
        <div className="no-collections-actions">

          <Link to={'/bids'} className="btn btn-secondary">Browse bids</Link>
        </div>
      </div>
    </div>
  );
};

export default NoCollections;