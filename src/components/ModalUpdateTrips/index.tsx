import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { db } from "../../services/firebaseConnection";
import { updateDoc, collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { TripUpdateContext } from "../../contexts/TripUpdateContext";
import { type TripProps } from "../TableTrips";
import { type VehicleInTrip } from "../ModalTrips";

interface ChangeModalUpdate {
  onCloseModal: (changed: boolean) => void;
}

export function ModalUpdateTrip({ onCloseModal }: ChangeModalUpdate) {
  const { tripUpdate } = useContext(TripUpdateContext);

  const [vehicleId, setVehicleId] = useState(tripUpdate?.vehicleId || "");
  const [model, setModel] = useState(tripUpdate?.model || "");
  const [plate, setPlate] = useState(tripUpdate?.plate || "");
  const [driver, setDriver] = useState(tripUpdate?.driver || "");
  const [origin, setOrigin] = useState(tripUpdate?.origin || "");
  const [destination, setDestination] = useState(tripUpdate?.destination || "");
  const [departureDate, setDepartureDate] = useState(tripUpdate?.departureDate || "");
  const [returnDate, setReturnDate] = useState(tripUpdate?.returnDate || "");
  const [notes, setNotes] = useState(tripUpdate?.notes || "");
  const [vehicles, setVehicles] = useState<VehicleInTrip[]>([]);

  function onCloseModalUpdate() {
    onCloseModal(true);
  }

useEffect(() => {
  async function loadVehicles() {
    const availableQuery = query(
      collection(db, "vehicles"),
      where("status", "==", "available")
    );

    const snapshot = await getDocs(availableQuery);

    const availableVehicles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<VehicleInTrip, "id">),
    }));

    if (tripUpdate?.vehicleId) {
      const currentSnap = await getDoc(
        doc(db, "vehicles", tripUpdate.vehicleId)
      );

      if (currentSnap.exists()) {
        const currentVehicle = {
          id: currentSnap.id,
          ...(currentSnap.data() as Omit<VehicleInTrip, "id">),
        };

        const filtered = availableVehicles.filter(
          copyVehicle => copyVehicle.id !== currentVehicle.id
        );

        setVehicles([currentVehicle, ...filtered]);
        return;
      }
    }

    setVehicles(availableVehicles);
  }

  loadVehicles();
}, [tripUpdate]);

  async function saveTripUpdateRecord(trip: TripProps | null) {
    if (!trip) return;

    try {
      if (trip.vehicleId !== vehicleId) {
        await updateDoc(doc(db, "vehicles", trip.vehicleId), {
          status: "available",
        });

        await updateDoc(doc(db, "vehicles", vehicleId), {
          status: "in_route",
        });
      }

      await updateDoc(doc(db, "trips", trip.id), {
        vehicleId,
        model,
        plate,
        driver,
        origin,
        destination,
        departureDate,
        returnDate,
        notes,
      });

      toast.success(
            <div>
              <h2 className="text-black font-bold text-sm">Registro Atualizado</h2>
              <p className="text-gray-400 text-sm">
                Viagem atualizada com sucesso.
              </p>
            </div>
      )
      onCloseModal(true);

    }catch(erro){
      toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Erro</h2>
        <p className="text-gray-400 text-sm">
          Erro ao atualizar viagem.
        </p>
      </div>
      )
    }
  }

  return (
   <>
      <motion.div
        className="fixed inset-0 bg-black/70 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onCloseModalUpdate()}
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
            onClick={onCloseModalUpdate}
          >
            <IoClose className="text-red-600 text-2xl duration-300 ease-in-out" />
          </button>

          <h2 className="text-black text-lg font-medium">Cadastrar Viagem</h2>
          <p className="text-[#3d3c3ccc] mb-5.5">
            Preencha os campos necessários para atualizar a viagem.
          </p>

          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full">
                <div className="flex gap-5">
                    <div className="flex flex-col w-full">
                      <label className="text-black font-medium pb-2">Modelo</label>
                      <select
                        className="border p-2 rounded-lg mb-4"
                        value={vehicleId}
                        onChange={(e) => {
                          const selected = vehicles.find(v => v.id === e.target.value);
                          if (selected) {
                            setVehicleId(selected.id);
                            setModel(selected.model);
                            setPlate(selected.plate);
                          }
                        }}
                      >
                        {vehicles.map(vehicle => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.model} - {vehicle.plate}
                            {vehicle.id === tripUpdate?.vehicleId ? " (atual)" : ""}
                          </option>
                        ))}
                      </select>
                        <label className="text-black font-medium pb-2 mt-3">Origem</label>
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

            <button className="text-white bg-[#36e26cbe] mt-4 p-2 rounded-lg cursor-pointer hover:bg-[#36e26c] hover:brightness-125 duration-500" type="button" onClick={() => saveTripUpdateRecord(tripUpdate)}>
              Atualizar viagem
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}