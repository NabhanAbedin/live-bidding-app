import React from 'react';
import '../../styles/favorites.css';
import { Link } from 'react-router-dom';

const NoFavorites = () => {
  return (
    <div className="no-favorites">
      <div className="no-favorites-card">
        <div className="no-favorites-icon" aria-hidden="true">
          {/* heart/favorite glyph */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20s-6.5-3.938-9-7.5C1.5 9.5 3 6.5 6 6.5c2 0 3.2 1.2 4 2 0.8-0.8 2-2 4-2 3 0 4.5 3 3 6  -2.5 3.562-9 7.5-9 7.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="no-favorites-title">No favorites yet</h2>
        <p className="no-favorites-subtitle">Like a bid? Favorite it to keep it on your radar.</p>
        <div className="no-favorites-actions">
          <Link to={'/bids'} className="btn btn-secondary">Bids</Link>
        </div>
      </div>
    </div>
  );
};

export default NoFavorites;