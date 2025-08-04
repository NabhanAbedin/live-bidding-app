import placeHolder from '../../assets/placeHolder.png';
import CategoryInput from "./CategoryInput";
import { useCreateBidsContext } from "../../context/createBidsContext";
import UserInput from "./UserInput";

const BidDetails = () => {
    const {formData} = useCreateBidsContext();

    return (
        <>
            <div className="image-insert-container">
                <img src={placeHolder} alt="" />
            </div>
            <div className="inputs-container">
                <CategoryInput detailsDataValue={formData.category}/>
                <UserInput name={'Item Name'} detailsValueKey={'bidItem'}  detailsDataValue={formData.bidItem}/>
                <UserInput name={'Starting bid'} detailsValueKey={'startingBid'} detailsDataValue={formData.startingBid}/>   
            </div>
        </>
    )

}

export default BidDetails;