import { CardTrips } from "../../../components/CardsTrips"
import { TableTrips } from "../../../components/TableTrips"
export function Trips(){
    return(
        <div className="bg-[#EEEEEE] max-w-screen min-h-screen rounded-2xl p-7">
            <CardTrips/>
            <TableTrips/>
        </div>
    )
}