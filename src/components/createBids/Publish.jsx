import { useCreateBidsContext } from "../../context/createBidsContext";
import { postBid } from "../../api/bidsApi";
import { Link, useNavigate } from "react-router-dom";
import BidPreviewCard from "../bidCards/BidPreviewCard";
import { useMutation } from "@tanstack/react-query";


const Publish = () => {
    const {formData} = useCreateBidsContext();
    const navigate = useNavigate();

    const {mutate, isLoading, isError, error} = useMutation({
        mutationFn: () => postBid(formData),
        onSuccess: () => {
            alert('posted bid');
            navigate('/');
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    }
    if (isLoading) return <p>Loading...</p>
    if (error) {
        console.log(error);
    }

    return (
        <>
        <div className="preview-card-container">
            <BidPreviewCard {...formData} preview={true}/>
        </div>
        <form className="final-review" onSubmit={e => handleSubmit(e)}>
            <input type="checkbox" required/>
            I have read and agree to the
            <Link to="/terms" target="_blank">Terms of Service</Link>
             
            <Link to="/privacy" target="_blank">Privacy Policy</Link>
            <button type="submit">Publish</button>
        </form>
        </>
    )
}

export default Publish;



