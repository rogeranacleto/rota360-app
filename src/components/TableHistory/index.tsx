import { RxPencil1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc, doc, updateDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import { BiSearchAlt2 } from "react-icons/bi";
import { type TripProps } from "../TableTrips";

export function formatDate(date: string){
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`
}

export function TableHistory(){
const [search, setSearch] = useState("");
const [tripRecord, setTripRecord] = useState<TripProps[]>([]);

useEffect(() => {
  const copyQuery = query(
    collection(db, "trips"),
    where("status", "==", "completed")
  );

  const unsubscribe = onSnapshot(copyQuery, (snapshot) => {
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
        notes: doc.data().notes,
        vehicleId: doc.data().vehicleId,
      });
    });

    setTripRecord(listRecords);
  });

  return () => unsubscribe();
}, []);

async function deleteTrip(trip: TripProps) {
  try {
    if (trip.vehicleId) {
      await updateDoc(doc(db, "vehicles", trip.vehicleId), {
        status: "available",
      });
    }

    await deleteDoc(doc(db, "trips", trip.id));

    toast.success(
      <div>
        <h2 className="text-black font-bold text-sm">Registro Deletado</h2>
        <p className="text-gray-400 text-sm">
          Viagem excluída com sucesso.
        </p>
      </div>
    );
  } catch (error) {
    toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Erro</h2>
        <p className="text-gray-400 text-sm">
          Erro ao excluir viagem.
        </p>
      </div>
    );
    console.error(error);
  }
}

const filterTrips = tripRecord.filter((item) => {
    const fullText = Object.values(item).join(" ").toLowerCase();
    const normalizedSearch = search.toLowerCase();
    return fullText.includes(normalizedSearch);
});

async function changeTripStatus(tripId: string) {
  try {
    const tripRef = doc(db, "trips", tripId);
    const tripSnap = await getDoc(tripRef);

    if (!tripSnap.exists()) {
      
    toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Erro</h2>
        <p className="text-gray-400 text-sm">
          A viagem não foi encontrada
        </p>
      </div>
    );
      return;
    }

    const tripData = tripSnap.data();

    const vehicleId = tripData.vehicleId;

    await updateDoc(tripRef, {
      status: "completed",
    });

    if (vehicleId) {
      await updateDoc(doc(db, "vehicles", vehicleId), {
        status: "available",
      });
    }

    toast.success(
      <div>
        <h2 className="text-black font-bold text-sm">Viagem concluída</h2>
        <p className="text-gray-400 text-sm">
          A viagem foi concluida com sucesso.
        </p>
      </div>
    );
  } catch (error) {
    console.error(error);
    toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Erro</h2>
        <p className="text-gray-400 text-sm">
          Não foi possível concluir a viagem.
        </p>
      </div>
    );
  }
}

function tripCompleted(){
    toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Erro</h2>
        <p className="text-gray-400 text-sm">Não é possível atualizar uma viagem concluída.</p>
      </div>
    );
}

    return(
        <div>
            <div className="w-full relative">
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
                            <button onClick={() => changeTripStatus(item.id)} className="cursor-pointer" disabled={item.status === "completed"}>
                            {item.status === "in_route" ? (
                                <span className="text-white bg-[#e9e511] pl-3 pr-3 pt-2 pb-2 rounded-2xl font-bold">
                                    Em rota
                                </span>
                            ) : (
                                <span className="text-white bg-[#02e929] pl-3 pr-3 pt-2 pb-2 rounded-2xl font-bold">
                                    Concluído
                                </span>
                            )}
                            </button>
                            </td>
                            <td className="pb-7.5 pt-7 pl-7.5 border-b border-[#2b2b2b25]">
                                <div className="flex items-center justify-end gap-3">
                                    {item.status === "completed" ? 
                                    <button className="hover:scale-105 transition cursor-pointer bg-[#36e26c] p-2 rounded-2xl duration-300 ease-in-out" onClick={() => tripCompleted()}>
                                        <RxPencil1 className="text-white text-bold cursor-pointer"/>
                                    </button> :
                                    <button className="hover:scale-105 transition cursor-pointer bg-[#36e26c] p-2 rounded-2xl duration-300 ease-in-out">
                                        <RxPencil1 className="text-white text-bold cursor-pointer"/>
                                    </button>
                                    }
                                    <button className="hover:scale-105 duration-300 ease-in-out cursor-pointer bg-red-600 hover: p-2 rounded-2xl" onClick={() => deleteTrip(item)}>
                                        <FaRegTrashAlt className="text-white text-bold duration-300 ease-in-out"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                        {filterTrips.length === 0 && (<tr><td colSpan={10} className="p-5 text-center text-gray-400 text-sm">Nenhum registro de viagem na tabela.</td></tr>)}
                    </table>
                </div>
            </div>
        </div>
    )
}