import '../../styles/homePage.css';
import SlidePanelSection from './SlidePanelSection';

const HomePage = () => {

    return (
        <div className="homepage-container">
            <div className="title-container">
            <h1>Live Bidding</h1>
            <div className='subtitle-container'>
                <p>where you live bid</p>
            </div>
            </div>
        <div className='slideshow-container'>
        <SlidePanelSection />
        </div>
        </div>
    )
}

export default HomePage;