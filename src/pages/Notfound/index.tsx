import { Link } from "react-router";
export function Notfound(){
    return (
      <div className="bg-[#EEEEEE] max-w-screen min-h-screen rounded-2xl p-7 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
            <p className="text-8xl font-medium text-[#36E26D] mb-2">404</p>
            <p className="text-6xl text-gray-400 font-medium mb-3">Not Found</p>
            <p className="text-gray-400 font-medium">Ops, a página não foi encontrada, <Link to={"/"} className="text-[#36E26D] font-bold">voltar para o início.</Link></p>
        </div>
      </div>
    );
}