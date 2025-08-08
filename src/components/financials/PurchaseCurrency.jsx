import { useEffect, useState, } from "react";
import singleCoin from '../../assets/singleCoin.png';
import doubleCoin from '../../assets/doubleCoins.png';
import threeCoin from '../../assets/threeCoins.png';
import fourCoin from '../../assets/fourCoins.png';
import PurchaseConfirm from "./PurchaseConfirm";

const PurchaseCurrency = () => {
    const [confirm, setConfirm] = useState(null);
    
    const openConfirm = (purchaseAmount, purchaseImg) => {
        setConfirm({purchaseAmount, purchaseImg})
    }

    useEffect(() => {
        if (confirm) {
            document.body.style.overflow = 'hidden';
            return;
        }
        document.body.style.overflow = 'scroll';
    },[confirm]);

    return (
        <>
        <div className="purchase-form-container">
                <div className='currency-purchase-container'>
                    <div className="img-container">
                        <img src={singleCoin} alt="" />
                    </div>
                    <h2>100 currency</h2>
                    <p> Perfect for getting started or topping up your balance. This starter pack gives you enough credits to explore different auction categories and test your bidding strategies without a major commitment.</p>
                    <div className="buy-now-container">
                        <button onClick={() => openConfirm(100,singleCoin)}>Buy now</button>
                    </div>
                </div>
                <div className='currency-purchase-container'>
                <div className="img-container">
                        <img src={doubleCoin} alt="" />
                    </div>
                    <h2>250 currency</h2>
                    <p> Great value for regular bidders who want more bidding power. This popular pack provides enough credits for multiple auction sessions and lets you compete for higher-value items with confidence.</p>
                    <div className="buy-now-container">
                        <button onClick={() => openConfirm(250,doubleCoin)}>Buy now</button>
                    </div>
                </div>
                <div className='currency-purchase-container' >
                <div className="img-container">
                        <img src={threeCoin} alt="" />
                    </div>
                    <h2>500 currency</h2>
                    <p>Ideal for serious bidders who participate frequently. This pack offers excellent value per credit and gives you the flexibility to bid on premium items while maintaining a healthy balance for ongoing auctions.</p>
                    <div className="buy-now-container">
                        <button onClick={() => openConfirm(500,threeCoin)}>Buy now</button>
                    </div>
                </div>
                <div className='currency-purchase-container'>
                <div className="img-container">
                        <img src={fourCoin} alt="" />
                    </div>
                    <h2>1000 currency</h2>
                    <p> Maximum value for power users and dedicated collectors. This premium pack provides the best rate per credit and ensures you never miss out on winning your target items, perfect for those who bid regularly across multiple categories.</p>
                    <div className="buy-now-container">
                        <button onClick={() => openConfirm(1000,fourCoin)}>Buy now</button>
                    </div>
                </div>
            </div>
           {confirm && (
             <PurchaseConfirm purchaseAmount={confirm.purchaseAmount} purchaseImg={confirm.purchaseImg} setConfirm={setConfirm} />
           )}
        </>
       
    )
}

export default PurchaseCurrency;