import { CardsVehicles } from "../../../components/CardsVehicles"
import { TableVehicles } from "../../../components/TableVehicles"
export function Vehicles(){
    return (
      <div className="bg-[#EEEEEE] max-w-screen min-h-screen rounded-2xl p-7">
        <CardsVehicles />
        <TableVehicles />
      </div>
    );
}