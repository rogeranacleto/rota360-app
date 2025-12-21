import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute/indes";
import { Layout } from "./layout";
import { Dashboard } from "./pages/Admin/Dashboard/indes";
import { History } from "./pages/Admin/History";
import { Trips } from "./pages/Admin/Trips";
import { Vehicles } from "./pages/Admin/Vehicles";
import { Notfound } from "./pages/Notfound";
export const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <Dashboard />,
            path: "admin/dashboard",
          },
          {
            element: <History />,
            path: "admin/history",
          },
          {
            element: <Trips />,
            path: "admin/trips",
          },
          {
            element: <Vehicles />,
            path: "admin/vehicles",
          },
        ],
      },
    ],
  },
  {
    element: <Notfound/>,
    path: "*"
  },
]);