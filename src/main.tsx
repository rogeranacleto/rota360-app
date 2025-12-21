import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { VehicleUpdateProvider } from "./contexts/VehicleUpdateContext";
import { TripUpdateProvider } from "./contexts/TripUpdateContext";
import { CardVehicleContextProvider } from "./contexts/CardVehicleContext";
import { CardTripContextProvider } from "./contexts/CardTripContext";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <VehicleUpdateProvider>
        <TripUpdateProvider>
          <CardVehicleContextProvider>
            <CardTripContextProvider>
              <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={10}
                containerStyle={{
                  padding: "10",
                }}
                toasterId="default"
                toastOptions={{
                  className: "",
                  duration: 5000,
                  removeDelay: 1000,
                  style: {
                    border: "1px solid #F3F4F633",
                    background: "#fff",
                    color: "#000",
                    borderRadius: "10px",
                    padding: "16px 25px",
                    fontFamily: "sans-serif",
                  },
                  success: {
                    duration: 5000,
                    iconTheme: {
                      primary: "green",
                      secondary: "white",
                    },
                  },
                }}
              />
              <RouterProvider router={router} />
            </CardTripContextProvider>
          </CardVehicleContextProvider>
        </TripUpdateProvider>
      </VehicleUpdateProvider>
    </AuthProvider>
  </StrictMode>
);
