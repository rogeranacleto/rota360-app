import { createContext, type ReactNode } from "react";
import { useState } from "react";
import { type TripProps } from "../components/TableTrips";
interface UpdateProps{
    tripUpdate: TripProps | null;
    changeUpdateTripModal: (register: TripProps) => void;
}
interface ChildrenProps{
    children: ReactNode
}

export const TripUpdateContext = createContext({} as UpdateProps)

const TripUpdateProvider = ({children}: ChildrenProps) => {
const [tripUpdate, setTripUpdate] = useState<TripProps | null>(null)

const changeUpdateTripModal = (register: TripProps) => {
    setTripUpdate(register)
}
    return(
        <TripUpdateContext.Provider value={{changeUpdateTripModal, tripUpdate}}>
            {children}
        </TripUpdateContext.Provider>
    )
}
export { TripUpdateProvider };