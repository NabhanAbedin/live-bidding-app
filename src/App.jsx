import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import PostedBids from "./components/postedBids/PostedBids";
import Header from "./components/navigation/Header";
import Login from "./components/authenticationPages/Login";

function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path={'/'} element={<HomePage/>} />
            <Route path={'bids'} element={<PostedBids/>} />
            <Route path={'/login'} element={<Login />} />
        </Routes>
        </>
    )

}

export default App
