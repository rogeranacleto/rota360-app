import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { db } from "../../services/firebaseConnection";
import { updateDoc, doc } from "firebase/firestore";
import { useState, useContext } from "react";
import { VehicleUpdateContext } from "../../contexts/VehicleUpdateContext";
import { type VehicleProps } from "../TableVehicles";
import toast from "react-hot-toast";
interface ChangeModalUpdate {
  onCloseModal: (changed: boolean) => void;
}

export function ModalUpdateVehicle({ onCloseModal }: ChangeModalUpdate) {
const { vehicleUpdate } = useContext(VehicleUpdateContext);
const [model, setModel] = useState(vehicleUpdate?.model || "");
const [plate, setPlate] = useState(vehicleUpdate?.plate || "");
const [type, setType] = useState(vehicleUpdate?.type || "");
const [notes, setNotes] = useState(vehicleUpdate?.notes || "");
const [status, setStatus] = useState<VehicleProps["status"]>(vehicleUpdate?.status || "available");

  function onCloseModalUpdate() {
    onCloseModal(true);
  }

  async function saveVehicleUpdate(vehicle: VehicleProps | null) {
    if (!vehicle) return;

    try {
      const refDoc = doc(db, "vehicles", vehicle.id);

      await updateDoc(refDoc, {
        model,
        plate,
        type,
        status,
        notes,
      });

      toast.success(
        <div>
          <h2 className="text-black font-bold text-sm">Cadastro Atualizado</h2>
          <p className="text-gray-400 text-sm">
            O cadastro foi atualizado com sucesso.
          </p>
        </div>
      );

      onCloseModal(true);
    } catch (error) {
      toast.error(
        <div>
          <h2 className="text-black font-bold text-sm">Erro</h2>
          <p className="text-gray-400 text-sm">
            Ocorreu um erro inesperado, acione o suporte!
          </p>
        </div>
      );
    }
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/70 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCloseModalUpdate}
      />
      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="bg-white w-lg flex flex-col border border-gray-100/20 p-5.5 rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer absolute right-5 top-4"
            onClick={onCloseModalUpdate}
          >
            <IoClose className="text-red-600 text-2xl duration-300" />
          </button>
          <h2 className="text-black text-lg font-medium">Atualizar Cadastro</h2>
          <p className="text-[#3d3c3ccc] mb-5.5">
            Preencha os campos necessários para atualizar o cadastro.
          </p>
          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full">
                <label className="text-black pb-2 font-medium">Modelo</label>
                <input
                  type="text"
                  className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                <label className="text-black pb-2 font-medium">Placa</label>
                <input
                  type="text"
                  className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                />
                <label className="text-black pb-2 font-medium">Tipo</label>
                <input
                  type="text"
                  className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label className="text-black pb-2 font-medium">Status</label>
                <select
                  className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as VehicleProps["status"])}
                >
                  <option value="available">Disponível</option>
                  <option value="unavailable">Indisponível</option>
                </select>
              </div>
            </div>
              <div className="flex flex-col w-full">
                <label className="text-black pb-2 font-medium">Notas</label>
                <textarea
                  rows={5}
                  className="border border-gray-400/50  rounded-lg focus:border-gray-800/40 outline-none text-black p-3.5"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            <button className="text-white bg-[#36e26cbe] mt-4 p-2 rounded-lg cursor-pointer hover:bg-[#36e26c] hover:brightness-125 duration-500" type="button" onClick={() => saveVehicleUpdate(vehicleUpdate)}>
              Atualizar cadastro
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
