import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import PostedBids from "./components/postedBids/PostedBids";
import Header from "./components/navigation/Header";
import Login from "./components/authenticationPages/Login";
import Register from "./components/authenticationPages/CreateAccount";
import BidPage from "./components/bidPage/BidPage";
import CreateBids from "./components/createBids/CreateBids";
import { CreateBidsProvider } from "./context/createBidsContext";


function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path={'/'} element={<HomePage/>} />
            <Route path={'bids'} element={<PostedBids/>} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'bids/create'} element={
                <CreateBidsProvider>
                     <CreateBids />
                </CreateBidsProvider>} />
            <Route path={'bids/:bidId'} element={<BidPage />} />
        </Routes>
        </>
    )

}

export default App
