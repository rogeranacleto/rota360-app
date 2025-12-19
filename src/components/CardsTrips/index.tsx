import { IoMdCheckboxOutline } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

export function CardTrips() {
  return (
    <div className="w-full">
      <div className="flex gap-7 flex-wrap">
        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-[#3d3c3c] text-sm mb-2">
              Total de viagens
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              15
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border border-solid border-[#525151] h-12 rounded-full p-3 flex items-center">
            <FiTruck className="text-[#696868] text-2xl" />
          </div>
        </div>

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-[#3d3c3c] text-sm mb-2">
              Viagens em andamento
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              15
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border border-solid border-[#525151] h-12 rounded-full p-3 flex items-center">
            <TbTruckDelivery className="text-[#696868] text-2xl" />
          </div>
        </div>

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-[#3d3c3c] text-sm mb-2">
              Viagens Concluídas
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              15
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border border-solid border-[#525151] h-12 rounded-full p-3 flex items-center">
            <IoMdCheckboxOutline className="text-[#696868] text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}