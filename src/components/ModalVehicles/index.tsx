import { db } from "../../services/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

interface ModalProps {
  onClose: (changed: boolean) => void;
}

export function ModalVehicles({onClose}: ModalProps){
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  function onCloseModal() {
    onClose(true);
  }

  async function saveVehicleRecord(e: React.FormEvent) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "vehicles"), {
        model,
        plate,
        type,
        notes,
        status: "available"
      });
      
      toast.success(
        <div>
          <h2 className="text-black font-bold text-sm">Veículo Cadastrado</h2>
          <p className="text-gray-400 text-sm">
            Veículo cadastrado com sucesso.
          </p>
        </div>
      );

      onClose(true);
    } catch (error) {
      toast.error(
        <div>
          <h2 className="text-black font-bold text-sm">Erro</h2>
          <p className="text-gray-400 text-sm">
            Houve um erro inesperado, ligue para o suporte.
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
          className="bg-white w-lg flex flex-col border border-gray-100/20 p-5.5 rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer absolute right-5 top-4"
            onClick={onCloseModal}
          >
            <IoClose className="text-red-600 text-2xl duration-300 ease-in-out" />
          </button>

          <h2 className="text-black text-lg font-medium">Cadastrar Novo Veículo</h2>
          <p className="text-[#3d3c3ccc] mb-5.5">
            Preencha os campos para cadastrar um novo veículo.
          </p>

          <form className="flex flex-col" onSubmit={saveVehicleRecord}>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full">
                <label className="text-black font-medium pb-2">Modelo</label>
                <input
                  type="text"
                  className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                <label className="text-black font-medium pb-2">Placa</label>
                <input
                  type="text"
                  className="border border-gray-400/50  p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                />
                <label className="text-black font-medium pb-2">Tipo</label>
                <input
                  type="text"
                  className="border border-gray-400/50 p-2 rounded-lg text-black mb-6.5 focus:border-gray-800/40 outline-none"
                  placeholder="Ex: caminhão, carro, moto, van"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
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
              Cadastrar veículo
            </button>
          </form>
        </div>
      </motion.div>
    </>
    )
}