import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react";
export function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main
        className={`
          p-4 overflow-y-auto transition-all duration-300
          ${isCollapsed ? "ml-20" : "ml-64"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}