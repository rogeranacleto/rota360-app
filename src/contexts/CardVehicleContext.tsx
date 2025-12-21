import { createContext, type ReactNode, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface CardVehicleContextProps {
  available: number;
  unavailable: number;
  inRoute: number;
  total: number;
}

interface ChildrenProps {
  children: ReactNode;
}

export const CardVehicleContext = createContext({} as CardVehicleContextProps);

export function CardVehicleContextProvider({ children }: ChildrenProps) {
  const [available, setAvailable] = useState(0);
  const [unavailable, setUnavailable] = useState(0);
  const [inRoute, setInRoute] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vehicles"), (snapshot) => {
      let availableCount = 0;
      let unavailableCount = 0;
      let inRouteCount = 0;

      snapshot.forEach((doc) => {
        const status = doc.data().status;

        if (status === "available") availableCount++;
        if (status === "unavailable") unavailableCount++;
        if (status === "in_route") inRouteCount++;
      });

      setAvailable(availableCount);
      setUnavailable(unavailableCount);
      setInRoute(inRouteCount);
      setTotal(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CardVehicleContext.Provider
      value={{ available, unavailable, inRoute, total,}}
    >
      {children}
    </CardVehicleContext.Provider>
  );
}
