import { CardsVehicles } from "../../../components/CardsVehicles"
import { TableTrips } from "../../../components/TableTrips"
export function Dashboard(){
    return(
        <div className="bg-[#EEEEEE] max-w-screen min-h-screen rounded-2xl p-7">
            <CardsVehicles/>
            <TableTrips/>
        </div>
    )
}