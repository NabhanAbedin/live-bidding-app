import { useQuery } from "@tanstack/react-query"
import { getStatistics } from "../../api/usersApi"
import SpentVsWonChart from "./SpentVsWonChart"


const Statistics = ({user,authLoading}) => {
    const {data: stats, isLoading, Error} = useQuery({
        queryKey: ['financialStats'],
        queryFn: getStatistics,
        enabled: !authLoading && Boolean(user)
    }) 
    if (stats) {
        console.log(stats);
    }
    return (
       <>
        {stats && (
             <>
             <SpentVsWonChart totalSpent={stats.totalSpent} totalWon={stats.totalEarned} />
             </>
        )}
       </>
    )
}

export default Statistics;