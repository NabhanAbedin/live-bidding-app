import { useQuery } from "@tanstack/react-query";
import { getFinancials } from "../../api/usersApi";
import { useState } from "react";

const PlaceBid = ({socket, bidId, setActive}) => {
    const [placeBid, setPlaceBid] = useState('');
    //might move this later
    const {data: currency, isLoading, error} = useQuery({
        queryKey: ['currenCurrency'],
        queryFn: getFinancials
    })

    const handlePlaceBid = (e) => {
            e.preventDefault();
            if (Number(placeBid) <= Number(currency.currentCurrency)) {
                socket.emit('placeBid', {bidId: bidId, amount: Number(placeBid)});
                setActive(false);
            }
            else {
                alert('invalid input');
            }
    }


    return (
        <div className="placebid-popup">
            <div className="close-btn-container">
                <button  className='close-btn' onClick={() => setActive(false)}>x</button>
            </div>
            {currency && (
                <>
                    <div className="current-container">
                        You currently have {currency.currentCurrency}
                    </div>
                    <form className="placebid-input" onSubmit={e => handlePlaceBid(e)}>
                        <input type="number" value={placeBid} onChange={e => setPlaceBid(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </>
            )}
        </div>
    )
}


export default PlaceBid;