import { db } from "../../services/firebaseConnection";
import { useState } from "react";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
interface TripModalProps {
  onClose: (changed: boolean) => void;
}

interface VehicleInTrip {
  id: string;
  model: string;
  plate: string;
  status: "available" | "in_route" | "unavailable";
}

export function ModalTrip({onClose}: TripModalProps){
const [driver, setDriver] = useState("");
const [origin, setOrigin] = useState("");
const [departureDate, setDepartureDate] = useState("");
const [destination, setDestination] = useState("");
const [returnDate, setReturnDate] = useState("");
const [notes, setNotes] = useState("");
const [vehicles, setVehicles] = useState<VehicleInTrip[]>([]);
const [selectedVehicleId, setSelectedVehicleId] = useState("");
  function onCloseModal() {
    onClose(true);
  }

  useEffect(() => {
  async function loadVehicles() {
    const copyQuery = query(
      collection(db, "vehicles"),
      where("status", "==", "available")
    );

    const snapshot = await getDocs(copyQuery);

    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<VehicleInTrip, "id">),
    }));

    setVehicles(list);
  }

  loadVehicles();
}, []);

async function saveVehicleRecord(e: React.FormEvent) {
  e.preventDefault();

  const selectedVehicle = vehicles.find(vehicle => vehicle.id === selectedVehicleId);

  if (!selectedVehicle) {
            toast.error(
            <div>
                <h2 className="text-black font-bold text-sm">Erro</h2>
                <p className="text-gray-400 text-sm">Selecione um veículo válido.</p>
            </div>
        )
    return;
  }

  try {
    await addDoc(collection(db, "trips"), {
      vehicleId: selectedVehicle.id,
      model: selectedVehicle.model,
      plate: selectedVehicle.plate,
      driver,
      origin,
      destination,
      departureDate,
      returnDate,
      status: "in_route",
      notes,

    });

    await updateDoc(doc(db, "vehicles", selectedVehicle.id), {
      status: "in_route",
      updatedAt: serverTimestamp()
    });

    toast.success(
      <div>
        <h2 className="text-black font-bold text-sm">Viagem cadastrada</h2>
        <p className="text-gray-400 text-sm">
          Veículo enviado para rota com sucesso.
        </p>
      </div>
    );

    onClose(true);
  } catch (error) {
    toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Erro</h2>
        <p className="text-gray-400 text-sm">
          Não foi possível cadastrar a viagem.
        </p>
      </div>
    );
  }
}
    return(
      <>
      <motion.div
        className="fixed inset-0 bg-black/70 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onCloseModal()}
      />

      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="bg-white w-2xl flex flex-col border border-gray-100/20 p-5.5 rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer absolute right-5 top-4"
            onClick={onCloseModal}
          >
            <IoClose className="text-red-600 text-2xl duration-300 ease-in-out" />
          </button>

          <h2 className="text-black text-lg font-medium">Cadastrar Viagem</h2>
          <p className="text-[#3d3c3ccc] mb-5.5">
            Preencha os campos para cadastrar uma nova viagem.
          </p>

          <form className="flex flex-col" onSubmit={saveVehicleRecord}>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full">
                <div className="flex gap-5">
                    <div className="flex flex-col w-full">
                      <label className="text-black font-medium pb-2">Modelo</label>
                      <select
                        className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                        required
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                      >
                        <option>Selecione um modelo de veículo</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.model} - {vehicle.plate}
                          </option>
                        ))}
                      </select>
                        <label className="text-black font-medium pb-2">Origem</label>
                        <input
                          type="text"
                          className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                          required
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                        />
                        <label className="text-black font-medium pb-2">Destino</label>
                        <input
                          type="text"
                          className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                          required
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-black font-medium pb-2">Motorista</label>
                        <input
                          type="text"
                          className="w-full border border-gray-400/50  p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                          required
                          value={driver}
                          onChange={(e) => setDriver(e.target.value)}
                        />
                        <label className="text-black font-medium pb-2">Data de saída</label>
                        <input
                          type="date"
                          className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                          required
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                        />
                        <label className="text-black font-medium pb-2">Data de retorno</label>
                        <input
                          type="date"
                          className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                          required
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-black pb-2">Notas</label>
              <textarea
                rows={5}
                className="border border-gray-400/50  rounded-lg focus:border-gray-800/40 outline-none text-black p-3.5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button className="text-white bg-[#36e26cbe] mt-4 p-2 rounded-lg cursor-pointer hover:bg-[#36e26c] hover:brightness-125 duration-500" type="submit">
              Cadastrar viagem
            </button>
          </form>
        </div>
      </motion.div>
    </>
    )
}