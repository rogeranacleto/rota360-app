import { RxPencil1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { AnimatePresence } from "motion/react";
import { useState, useEffect, useContext } from "react";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import { BiSearchAlt2 } from "react-icons/bi";
import { ModalTrip } from "../ModalTrips";
import { ModalUpdateTrip } from "../ModalUpdateTrips";
import { TripUpdateContext } from "../../contexts/TripUpdateContext";
export interface TripProps{
    id: string;
    model: string;
    plate: string;
    driver: string;
    origin: string;
    departureDate: string;
    destination: string;
    returnDate: string;
    status: string;
    notes: string;
}

export function formatDate(date: string){
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`
}

export function TableTrips(){
const {changeUpdateTripModal} = useContext(TripUpdateContext);
const [search, setSearch] = useState("");
const [tripRecord, setTripRecord] = useState<TripProps[]>([]);
const [openTripModal, setOpenTripModal] = useState(false);
const [openTripUpdateModal, setOpenTripUpdateModal] = useState(false);
function changeModal(){
    setOpenTripModal(true)
}

function changeUpdateModal(register: TripProps){
    changeUpdateTripModal(register)
    setOpenTripUpdateModal(true)
}

useEffect(() => {
    async function loadReacords(){
        onSnapshot(collection(db, "trips"),(snapshot) => {
        let listRecords: TripProps[] = [];
        snapshot.forEach((doc) => {
            listRecords.push({
                id: doc.id,
                model: doc.data().model,
                plate: doc.data().plate,
                driver: doc.data().driver,
                origin: doc.data().origin,
                departureDate: doc.data().departureDate,
                destination: doc.data().destination,
                returnDate: doc.data().returnDate,
                status: doc.data().status,
                notes: doc.data().notes

            })
        })
        setTripRecord(listRecords)
    })
    }
    loadReacords()
},[])

async function deleteTrip(id: string){
    const docRef = doc(db, "trips", id)
    await deleteDoc(docRef)
    .then(() => {
        toast.success(
            <div>
                <h2 className="text-black font-bold text-sm">Registro Deletado</h2>
                <p className="text-gray-400 text-sm">Registro de viagem deletado com sucesso.</p>
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

const filterTrips = tripRecord.filter((item) => {
    const fullText = Object.values(item).join(" ").toLowerCase();
    const normalizedSearch = search.toLowerCase();
    return fullText.includes(normalizedSearch);
});

    return(
        <div>
            <AnimatePresence>
                {openTripModal && (<ModalTrip onClose={() => setOpenTripModal(false)}/>)}
            </AnimatePresence>
            <AnimatePresence>
                {openTripUpdateModal && (<ModalUpdateTrip onCloseModal={() => setOpenTripUpdateModal(false)}/>)}
            </AnimatePresence>
            <div className="flex justify-end mt-7">
                <button className="text-white flex items-center gap-3 bg-[#36e26cbe] h-10 max-w-[11em] w-full rounded-lg cursor-pointer pl-3 hover:bg-[#36e26c] duration-300 ease-in-out text-sm font-medium" onClick={changeModal}><HiPlus className="text-white text-lg"/>Nova Viagem</button>
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
                                <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">MOTORISTA</th>
                                <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">ORIGEM</th>
                                <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">DATA DE SAÍDA</th>
                                <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">DESTINO</th>
                                <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">DATA DE RETORNO</th>
                                <th className="pb-7 pl-7.5 text-left border-b border-[#2b2b2b25]">STATUS DA VIAGEM</th>
                                <th className="pb-7 pr-7.5 text-right border-b border-[#2b2b2b25]">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-black">
                        {filterTrips.map((item) => (
                        <tr className="bg-white duration-300 ease-in-out">
                            <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.model}</td>
                            <th className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.plate}</th>
                            <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.driver}</td>
                            <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.origin}</td>
                            <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{formatDate(item.departureDate)}</td>
                            <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{item.destination}</td>
                            <td className="pb-7.5 pt-7 pl-7.5 font-medium border-b border-[#2b2b2b25]">{formatDate(item.returnDate)}</td>
                            <td className="pb-7.5 pt-7 pl-7.5 border-b border-[#2b2b2b25]">
                            {item.status === "in_route" && <span className="text-white bg-[#e9e511] pl-3 pr-3 pt-2 pb-2 rounded-2xl font-bold">Em rota</span>}
                            </td>
                            <td className="pb-7.5 pt-7 pl-7.5 border-b border-[#2b2b2b25]">
                                <div className="flex items-center justify-end gap-3">
                                    <button className="hover:scale-105 transition cursor-pointer bg-[#36e26c] p-2 rounded-2xl duration-300 ease-in-out" onClick={() => changeUpdateModal(item)}>
                                        <RxPencil1 className="text-white text-bold cursor-pointer"/>
                                    </button>
                                    <button className="hover:scale-105 duration-300 ease-in-out cursor-pointer bg-red-600 hover: p-2 rounded-2xl" onClick={() => deleteTrip(item.id)}>
                                        <FaRegTrashAlt className="text-white text-bold duration-300 ease-in-out"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}