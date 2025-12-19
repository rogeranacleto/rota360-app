import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { NavLink } from "react-router";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FaTruck } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

interface SidebarProps{
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

export function Sidebar({isCollapsed, setIsCollapsed}: SidebarProps){
const {logout} = useContext(AuthContext);
const navigate = useNavigate();
const [isHovered, setIsHovered] = useState(true);


async function logoutUser(){
    await signOut(auth);
    logout();
    navigate("/login")
}

function sidebarCollapsed(){
    setIsCollapsed(true)
}

return(
        <div>
            <main
            className={`
                fixed top-0 left-0
                ${!isCollapsed ? "w-64" : "w-20"}
                h-screen bg-white flex flex-col
                transition-all ease-in-out duration-300
                z-50
            `}
            onMouseEnter={() => {
                if (isCollapsed) setIsHovered(true);
            }}
            onMouseLeave={() => {
                if (isCollapsed) setIsHovered(false);
            }}
            >
                <nav className="text-black pr-5 pl-5 flex flex-col h-screen justify-between relative">
                        <div className="flex items-center ml-2 mt-8">
                            {isHovered ? <button  className="h-8" onClick={() => setIsCollapsed(false)}><div className="hover:text-[#3a0eb6] hover:bg-[#6f5af511] rounded-lg duration-500 ease-in-out cursor-pointer"><FaRegArrowAltCircleRight className="absolute left-8.5 text-lg top-9 text-[#0e0d0d]"/></div></button> : <FaTruck className="h-8 w-8 text-black"/>}

                            {!isCollapsed && <div className="flex items-center justify-center"><FaTruck className="h-8 w-8 text-black"/><h1 className="text-2xl font-bold ml-2.5 text-black">Rota360</h1></div>}
                            <button className="cursor-pointer" onClick={() => sidebarCollapsed()}>
                                <div className="hover:text-[#ffffff8f] hover:bg-[#6f5af511] rounded-lg duration-500 ease-in-out cursor-pointer">
                                    {!isCollapsed && <FaRegArrowAltCircleLeft className="absolute right-5 text-lg top-9 text-[#0e0d0d]"/>}
                                </div>
                            </button>
                        </div>
                    <div className="flex flex-col gap-5">
                            <NavLink 
                                to="admin/dashboard"
                                className={({ isActive }) =>
                                    `relative  rounded-lg duration-500 ease-in-out 
                                    ${isActive ? "bg-[#36E26C] text-black" : "hover:text-black hover:bg-[#03030348]"}`
                                }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-black rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <MdDashboardCustomize className="absolute top-1.5 left-2.5 text-lg text-black"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-white rounded-lg duration-500 ease-in-out pt-2.5 pb-2.5 pl-3">
                                <MdDashboardCustomize className="absolute top-3.5 left-4 text-lg text-black"/>
                                <p className={`text-black font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Dashboard</p>
                            </div>
                            }
                        </NavLink>
                        <NavLink 
                                to="admin/trips"
                                className={({ isActive }) =>
                                    `relative  rounded-lg duration-500 ease-in-out 
                                    ${isActive ? "bg-[#36E26C] text-black" : "hover:text-black hover:bg-[#03030348]"}`
                                }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-black  rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <MdOutlineTravelExplore className="absolute top-2 left-2.5 text-lg text-black"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-black rounded-lg duration-500 ease-in-out pt-2.5 pb-2.5 pl-3">
                                <MdOutlineTravelExplore className="absolute top-3.5 left-3 text-lg text-black"/>
                                <p className={`text-black font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Viagens</p>
                            </div>
                            }
                        </NavLink>
                        <NavLink 
                            to="admin/vehicles"
                            className={({ isActive }) =>
                                `relative  rounded-lg duration-500 ease-in-out 
                                ${isActive ? "bg-[#36E26C] text-black" : "hover:text-black hover:bg-[#03030348]"}`
                            }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-black rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <FaTruck className="absolute top-1.5 left-3 text-lg text-black"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-whtie rounded-lg duration-500 ease-in-out  pt-2.5 pb-2.5 pl-3">
                                <FaTruck className="absolute top-3 left-3 text-lg text-black"/>
                                <p className={`text-black font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Veículos</p>
                            </div>
                            }
                        </NavLink>
                        <NavLink 
                            to="admin/history"
                            className={({ isActive }) =>
                                `relative  rounded-lg duration-500 ease-in-out 
                                ${isActive ? "bg-[#36E26C] text-black" : "hover:text-black hover:bg-[#03030348]"}`
                            }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-black rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <IoDocumentText className="absolute top-1.5 left-3 text-lg text-black"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-black rounded-lg duration-500 ease-in-out  pt-2.5 pb-2.5 pl-3">
                                <IoDocumentText className="absolute top-3 left-3 text-lg text-black"/>
                                <p className={`text-black font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Histórico</p>
                            </div>
                            }
                        </NavLink>
                    </div>
                    <button className="text-black" onClick={() => logoutUser()}>
                        {
                        isCollapsed ? 
                        <div className="flex gap-5 mb-8 hover:text-black rounded-lg duration-500 ease-in-out cursor-pointer pt-2.5 pb-2.5 pl-2 items-center">
                            <p className="font-black text-lg"><PiSignOutBold /></p>
                            {!isCollapsed && <p>Sair</p>}
                        </div>
                                                        : 
                        <div className="flex gap-5 mb-8 hover:bg-[#03030348] rounded-lg duration-500 ease-in-out cursor-pointer pt-2.5 pb-2.5 pl-2 items-center">
                            <p className="font-white text-lg"><PiSignOutBold className="text-black"/></p>
                            {!isCollapsed && <p className="text-black">Sair</p>}
                        </div>
                        }
                    </button>
                </nav>
            </main>
        </div>
    )
}