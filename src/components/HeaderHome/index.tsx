import { Link } from "react-router";
import { FaTruck } from "react-icons/fa";

export function HeaderHome(){
function scrollToSection(id: string){
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({behavior: "smooth"})
}    
    return(
        <div className="hidden max-w-6xl w-full lg:block md:block">
            <div className="bg-[#36e26d] rounded-lg mt-8 min-h-17 flex justify-between items-center pl-7 pr-7">
                <Link to={"/"} className="flex items-center gap-3">
                    <FaTruck className="text-black text-2xl"/>
                    <h1 className="font-bold text-lg text-black">Rota360</h1>
                </Link>
                <nav className="flex gap-7">
                    <button className="text-sm hover:bg-[#8a8787b4] pt-2 pb-2 font-medium pl-3 pr-3 duration-300 ease-in-out rounded-sm cursor-pointer" onClick={() => scrollToSection("about")}>Sobre</button>
                    <button className="text-sm hover:bg-[#8a8787b4] pt-2 pb-2 pl-3 font-medium pr-3 duration-300 ease-in-out rounded-sm cursor-pointer" onClick={() => scrollToSection("platform")}>Plataforma</button>
                    <button className="text-sm hover:bg-[#8a8787b4] text-black font-medium pt-2 pb-2 pl-3 pr-3 duration-300 ease-in-out rounded-sm cursor-pointer" onClick={() => scrollToSection("proposal")}>Proposta</button>
                </nav>
                <div className="flex gap-7">
                    <Link to={"/login"}><button className="text-sm cursor-pointer text-black hover:bg-[#8a8787b4] font-medium duration-300 ease-in-out rounded-sm pt-2 pb-2 pl-3 pr-3">Entrar</button></Link>
                    <Link to={"/signup"}><button className="text-sm cursor-pointer bg-black hover:bg-[#222121] font-medium hover:text-white duration-300 ease-in-out rounded-sm text-white pt-2 pb-2 pl-3 pr-3">Criar conta grátis</button></Link>
                </div>
            </div>
        </div>
    )
}