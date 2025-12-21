import { useContext } from "react";
import { CardTripContext } from "../../contexts/CardTripContext";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

export function CardTrips() {
  const { totalTrips, inRouteTrips, completedTrips } =
    useContext(CardTripContext);

  return (
    <div className="w-full">
      <div className="flex gap-7 flex-wrap">

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-sm text-[#3d3c3c] mb-2">
              Total de viagens
            </h1>
            <p className="text-3xl font-bold text-black mb-3.5">
              {totalTrips}
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border h-12 rounded-full p-3 flex items-center">
            <FiTruck className="text-2xl text-[#696868]" />
          </div>
        </div>

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-sm text-[#3d3c3c] mb-2">
              Viagens em andamento
            </h1>
            <p className="text-3xl font-bold text-black mb-3.5">
              {inRouteTrips}
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border h-12 rounded-full p-3 flex items-center">
            <TbTruckDelivery className="text-2xl text-[#696868]" />
          </div>
        </div>

        <div className="bg-white flex-1 min-w-70 min-h-45 rounded-lg flex justify-between p-6 shadow-2xl">
          <div>
            <h1 className="text-sm text-[#3d3c3c] mb-2">
              Viagens concluídas
            </h1>
            <p className="text-3xl font-bold text-black mb-3.5">
              {completedTrips}
            </p>
            <p className="text-sm text-[#8a8787]">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="border h-12 rounded-full p-3 flex items-center">
            <IoMdCheckboxOutline className="text-2xl text-[#696868]" />
          </div>
        </div>

      </div>
    </div>
  );
}
