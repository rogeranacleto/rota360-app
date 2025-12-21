import { createContext, type ReactNode, useState } from "react";

interface CardTripContextProps {
  totalTrips: number;
  inRouteTrips: number;
  completedTrips: number;

  setTotalTrips: (value: number) => void;
  setInRouteTrips: (value: number) => void;
  setCompletedTrips: (value: number) => void;
}

export const CardTripContext = createContext({} as CardTripContextProps);

interface ProviderProps {
  children: ReactNode;
}

export function CardTripContextProvider({ children }: ProviderProps) {
  const [totalTrips, setTotalTrips] = useState(0);
  const [inRouteTrips, setInRouteTrips] = useState(0);
  const [completedTrips, setCompletedTrips] = useState(0);

  return (
    <CardTripContext.Provider
      value={{ totalTrips, inRouteTrips, completedTrips, setTotalTrips, setInRouteTrips, setCompletedTrips}}
    >
      {children}
    </CardTripContext.Provider>
  );
}
