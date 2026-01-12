import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { Link } from "react-router";
export function FooterHome(){
    return(
        <footer className="bg-black border-t border-gray-400/20 max-w-screen pb-50 mt-50 pt-30 relative flex items-center justify-center w-full">
            <div className="flex flex-col text-center justify-center" data-aos="fade-left" data-aos-duration="2300">
                <h2 className="text-[#ffffff] font-bold text-4xl">Venha conhecer o sistema!</h2>
                <p className="text-gray-400 mt-4">A plataforma é totalmente gratuíta, crie sua conta e comece a utilizar os recursos sem nenhum custo.</p>
                <Link to={"/signup"}>
                    <button className=" mt-10 text-sm bg-[#36E26D] pt-4 pb-4 pl-6 pr-6 font-medium text-black cursor-pointer rounded-sm hover:scale-105 border hover:border-[#36E26D] hover:border-solid hover:text-[#36E26D] hover:bg-black duration-300 ease-in-out">Acessar Plataforma</button>
                </Link>
            </div>
            <div className="absolute bottom-2 flex items-center flex-col" data-aos="fade-right" data-aos-duration="2500">
                <p className="text-white font-bold text-center text-sm">Desenvolvido por Roger Anacleto • © 2025 Todos os direitos reservados.</p>
                <div className="flex items-center gap-3 mt-2">
                    <a href="https://github.com/rogeranacleto" className="hover:scale-110 duration-300 ease-in-out" target="_blank">
                        <FiGithub className="text-white text-lg"/>
                    </a>
                    <a href="https://www.linkedin.com/in/rogeranacleto/" className="hover:scale-110 duration-300 ease-in-out" target="_blank">
                        <CiLinkedin className="text-white text-2xl"/>
                    </a>
                </div>
            </div>
        </footer>
    )
}