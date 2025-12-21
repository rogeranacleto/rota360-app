import { createContext, type ReactNode } from "react";
import { useState } from "react";
import { type VehicleProps } from "../components/TableVehicles";
interface UpdateProps{
    vehicleUpdate: VehicleProps | null;
    changeUpdateVehicleModal: (register: VehicleProps) => void;
}
interface ChildrenProps{
    children: ReactNode
}

export const VehicleUpdateContext = createContext({} as UpdateProps)

const VehicleUpdateProvider = ({children}: ChildrenProps) => {
const [vehicleUpdate, setVehicleUpdate] = useState<VehicleProps | null>(null)

const changeUpdateVehicleModal = (register: VehicleProps) => {
    setVehicleUpdate(register)
}
    return(
        <VehicleUpdateContext.Provider value={{changeUpdateVehicleModal, vehicleUpdate}}>
            {children}
        </VehicleUpdateContext.Provider>
    )
}
export { VehicleUpdateProvider };