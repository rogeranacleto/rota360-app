import { TbTruckOff } from "react-icons/tb";
import { TbTruck } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { CardVehicleContext } from "../../contexts/CardVehicleContext";
import { useContext } from "react";
export function CardsVehicles() {
const {available, inRoute, unavailable, total} = useContext(CardVehicleContext);
  return (
    <div className="w-full">
      <div className="flex gap-7 flex-wrap">
        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-[#3d3c3c] text-sm mb-2">
              Total de veículos
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              {total}
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border border-solid border-[#525151] h-12 rounded-full p-3 flex items-center">
            <TbTruck className="text-[#696868] text-2xl" />
          </div>
        </div>

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-[#3d3c3c] text-sm mb-2">
              Veículos disponíveis
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              {available}
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border border-solid border-[#525151] h-12 rounded-full p-3 flex items-center">
            <TbTruck className="text-[#696868] text-2xl" />
          </div>
        </div>

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-[#3d3c3c] text-sm mb-2">
              Veículos em rota
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              {inRoute}
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
              Veículos indisponíveis
            </h1>
            <p className="text-black font-bold text-3xl mb-3.5">
              {unavailable}
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border border-solid border-[#525151] h-12 rounded-full p-3 flex items-center">
            <TbTruckOff className="text-[#696868] text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}