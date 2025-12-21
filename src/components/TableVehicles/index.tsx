import { RxPencil1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import { AnimatePresence } from "motion/react";
import { ModalVehicles } from "../ModalVehicles";
import { useState, useEffect, useContext } from "react";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import { VehicleUpdateContext } from "../../contexts/VehicleUpdateContext";
import { ModalUpdateVehicle } from "../ModalUpdateVehicles";

export interface VehicleProps {
  id: string;
  vehicleId: string;
  model: string;
  plate: string;
  type: string;
  status: "available" | "in_route" | "unavailable";
  notes: string;
}

export function TableVehicles(){
const [vehiclesList, setVehiclesList] = useState<VehicleProps[]>([]);
const [openModal, setOpenModal] = useState(false);
const [openModalUpdateVehicle, setOpenModalUpdateVehicle] = useState(false);
const {changeUpdateVehicleModal} = useContext(VehicleUpdateContext);
const [search, setSearch] = useState("");

function changeModal(){
    setOpenModal(true)
}

useEffect(() => {
    async function loadReacords(){
        onSnapshot(collection(db, "vehicles"),(snapshot) => {
        let listRecords: VehicleProps[] = [];
        snapshot.forEach((doc) => {
            listRecords.push({
                id: doc.id,
                model: doc.data().model,
                plate: doc.data().plate,
                type: doc.data().type,
                status: doc.data().status,
                notes: doc.data().notes,
                vehicleId: doc.data().vehicleId

            })
        })
        setVehiclesList(listRecords)
    })
    }
    loadReacords()
},[])

async function deleteVehicle(id: string){
    const docRef = doc(db, "vehicles", id)
    await deleteDoc(docRef)
    .then(() => {
        toast.success(
            <div>
                <h2 className="text-black font-bold text-sm">Cadastro Deletado</h2>
                <p className="text-gray-400 text-sm">O cadastro foi deletado com sucesso.</p>
            </div>
        )
    })
    .catch(() => {
        toast.error(
            <div>
                <h2 className="text-black font-bold text-sm">Erro</h2>
                <p className="text-gray-400 text-sm">Ocorreu um erro inesperado, acione o suporte!</p>
            </div>
        )
    })
}

const filterVehicles = vehiclesList.filter((item) => {
    const fullText = Object.values(item).join(" ").toLowerCase();
    const normalizedSearch = search.toLowerCase();
    return fullText.includes(normalizedSearch);
});

function openUpdateModal(register: VehicleProps){
    changeUpdateVehicleModal(register)
    setOpenModalUpdateVehicle(true)
}
function disableDeleteButton(){
            toast.error(
            <div>
                <h2 className="text-black font-bold text-sm">Erro</h2>
                <p className="text-gray-400 text-sm">Esse veículo não pode ser excluído pois está em rota.</p>
            </div>
        )
}
function disableEditButton(){
            toast.error(
            <div>
                <h2 className="text-black font-bold text-sm">Erro</h2>
                <p className="text-gray-400 text-sm">Esse veículo não pode ser editado pois está em rota.</p>
            </div>
        )
}
    return(
        <div>
            <AnimatePresence>
                {openModal && (<ModalVehicles onClose={() => setOpenModal(false)}/>)}
            </AnimatePresence>
            <AnimatePresence>
                {openModalUpdateVehicle && (<ModalUpdateVehicle onCloseModal={() => setOpenModalUpdateVehicle(false)}/>)}
            </AnimatePresence>
            <div className="flex justify-end mt-7">
                <button className="text-white flex items-center gap-3 bg-[#36e26cbe] h-10 max-w-[12em] w-full rounded-lg cursor-pointer pl-3 hover:bg-[#36e26c] duration-300 ease-in-out text-sm font-medium" onClick={changeModal}><HiPlus className="text-white text-lg"/>Adicionar Veículo</button>
            </div>
            <div className="w-full mt-4 relative">
                <input type="text" placeholder="Pesquise um registro" className="w-full border border-solid border-[#2b2b2b4b] rounded-lg p-2 text-black focus:outline-0 focus:ring-0.5 focus:border-[#2b2b2ba6]" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <BiSearchAlt2 className="text-[#2b2b2b9d] text-3xl absolute right-4 top-1.5"/>
            </div>
            <div className="overflow-x-auto w-full border border-solid border-[#ffffff4b] bg-white mt-4 rounded-lg shadow-2xl">
                <div className="p-7.5">
                    <table className="w-full min-w-max text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-gray-400 text-sm">
                            <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">MODELO</th>
                            <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">PLACA</th>
                            <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">TIPO</th>
                            <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">STATUS</th>
                            <th className="pb-7 pr-7.5 text-right border-b border-[#2b2b2b25]">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-black">
                    {filterVehicles.map((item) => (
                    <tr className="bg-white duration-300 ease-in-out">
                        <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.model}</td>
                        <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.plate}</td>
                        <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.type}</td>
                        <td className="pb-7.5 pt-7 pl-7.5 border-b border-[#2b2b2b25]">
                            {item.status === "available" ? <span className="text-white bg-[#02e929] pl-3 pr-3 pt-2 pb-2 rounded-2xl font-bold">Disponível</span> : item.status === "in_route" ? <span className="text-white bg-[#e9e511] pl-3 pr-3 pt-2 pb-2 rounded-2xl font-bold">Em rota</span> :
                            <span className="text-white bg-[#ee1109] pl-3 pr-3 pt-2 pb-2 rounded-2xl font-bold">Indisponível</span>
                            }
                        </td>
                        <td className="pb-7.5 pt-7 pl-7.5 border-b border-[#2b2b2b25]">
                            <div className="flex items-center justify-end gap-3">
                                {item.status === "in_route" ?
                                <button className="hover:scale-105 transition cursor-pointer bg-[#36e26c] p-2 rounded-2xl duration-300 ease-in-out" onClick={() => disableEditButton()}>
                                    <RxPencil1 className="text-white text-bold cursor-pointer"/>
                                </button> :
                                <button className="hover:scale-105 transition cursor-pointer bg-[#36e26c] p-2 rounded-2xl duration-300 ease-in-out" onClick={() => openUpdateModal(item)}>
                                    <RxPencil1 className="text-white text-bold cursor-pointer"/>
                                </button>
                                }
                                {item.status === "in_route" ? 
                                <button className="hover:scale-105 duration-300 ease-in-out cursor-pointer bg-red-600 hover: p-2 rounded-2xl" onClick={() => disableDeleteButton()}>
                                    <FaRegTrashAlt className="text-white text-bold duration-300 ease-in-out" />
                                </button> : 
                                <button className="hover:scale-105 duration-300 ease-in-out cursor-pointer bg-red-600 hover: p-2 rounded-2xl" onClick={() => deleteVehicle(item.id)}>
                                    <FaRegTrashAlt className="text-white text-bold duration-300 ease-in-out" />
                                </button>
                                }
                            </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                    {filterVehicles.length === 0 && (<tr><td colSpan={10} className="p-5 text-center text-gray-400 text-sm">Nenhum veículo cadastrado.</td></tr>)}
                    </table>
                </div>
            </div>
        </div>
    )
}