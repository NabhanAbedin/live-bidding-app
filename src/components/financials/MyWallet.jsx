import { useQuery } from "@tanstack/react-query";
import { getFinancials } from "../../api/usersApi";
import formatDate from "../../utils/formatDate";

const MyWallet = ({user, authLoading}) => {
    const {data, isFetching, Error} = useQuery({
        queryKey: ['myWallet'],
        queryFn: getFinancials,
        enabled: !authLoading && Boolean(user)
    })

    return (
        <div className="myWallet-container">
            {data && (
                <>
                <div className="currency-container">
                    <div className="wallet-header">
                        <p>My Wallet</p>
                    </div>
                    <div className="currency-amount">
                        <p className="currency">{data.currentCurrency}</p>
                        <p className='subtitle'>available balance</p>
                    </div>
                </div>
                <div className="transactions-container">
                    <h2>Recent Transactions</h2>
                    {data.transactions.map((transaction,index) => (
                        <div className="transaction" key={index}>
                            <div className="bid-info">
                                <h3>{transaction.bidItem}</h3>
                                <p>{formatDate(transaction.startTime)}</p>
                            </div>
                            <div className="bidsold-container">
                                <p>- {transaction.bidSold}</p>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default MyWallet;