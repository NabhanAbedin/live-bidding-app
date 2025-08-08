import { useMutation, useQueryClient} from "@tanstack/react-query";
import { updateFinancials } from "../../api/usersApi.js";
import { useCallback } from "react";

const PurchaseConfirm = ({purchaseAmount, purchaseImg, setConfirm}) => {
    const queryClient = useQueryClient();

    const {mutate: purchase, isLoading, Error} = useMutation({
        mutationFn: () => updateFinancials(purchaseAmount),
        onSuccess: () => {
           alert('added to account');
           setConfirm(null);
           queryClient.invalidateQueries({queryKey: ['myWallet']});
           requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
    })

    const handleSubmit = async e => {
        e.preventDefault();
        if (purchaseAmount !== null) {
            purchase();
        }
    }

    const handleClose = useCallback(() => {
        setConfirm(null);
    },[])

    return (
        <form className="purchase-confirm-container" onSubmit={e => handleSubmit(e)}>
            <div className="confirm-image-container">
                <img src={purchaseImg} alt="" />
            </div>
            <div className="confirm-text">
                <button onClick={handleClose}>close</button>
                <h2>Confirm Purchase of {purchaseAmount}</h2>
                <div className="terms-container">
                    <input type="checkbox" /> I agree to the terms and services
                </div>
                <button type="submit">Purchase</button>
            </div>
        </form>
    )
}

export default PurchaseConfirm;