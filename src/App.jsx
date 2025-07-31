import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import PostedBids from "./components/postedBids/PostedBids";
import Header from "./components/navigation/Header";

function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path={'/'} element={<HomePage/>} />
            <Route path={'bids'} element={<PostedBids/>} />
        </Routes>
        </>
    )

}

export default App
