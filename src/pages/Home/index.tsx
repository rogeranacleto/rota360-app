import { Link } from "react-router"
import { HeaderHome } from "../../components/HeaderHome"
import bgRota360 from "../../assets/bg-rota360.png"
import { FooterHome } from "../../components/FooterHome"
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaTruck } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { PiEyeSlashLight } from "react-icons/pi";
import { TbTruckOff } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiFolderCloseLine } from "react-icons/ri";


export function Home(){
    useEffect(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    })
},[])
    return(
        <div className="max-w-screen min-h-screen w-full">
                <div className="max-w-screen w-full min-h-260 bg-[#36e26d] bg-no-repeat bg-fixed rounded-b-2xl">
                    <header className="flex justify-center pl-4 pr-4" data-aos="fade-up" data-aos-duration="2300">
                        <HeaderHome/>
                    </header>
                    <div className="max-w-3xl flex flex-col justify-center items-center m-auto mt-30" data-aos="fade-up" data-aos-duration="2200">
                        <p className="text-[#EEEEEE] mb-8 font-medium">Conheça o Rota360</p>
                        <h1 className="font-bold text-6xl text-black mb-7 text-center">Gerencie Frotas com Eficiência</h1>
                        <p className="text-blackfont-medium text-center text-lg sm:text-lg">Muitas frotas perdem tempo e dinheiro por falta de controle sobre veículos e viagens.
                        O <span className="font-bold text-black">Rota360</span> centraliza todas as informações operacionais em um único sistema, sem complicações, trazendo mais clareza, organização e decisões rápidas para uma gestão muito mais eficiente no dia a dia.</p>
                        <Link to={"/signup"}><button className="mt-10 text-lg bg-black pt-4 pb-4 pl-6 pr-6 font-medium cursor-pointer rounded-sm hover:scale-105 border hover:bg-[#36E26D] text-white border border-solid border-black hover:text-black duration-300 ease-in-out hover:font-medium">Acessar Plataforma</button></Link>
                    </div>
                </div>
                <div className="hidden sm:block md:block max-w-screen w-full min-h-120 bg-black rounded-2xl linear mt-5">
                <img
                    src={bgRota360}
                    alt="Imagem do Sistema"
                    data-aos="fade-up" data-aos-duration="2100"
                    className="hidden lg:block max-w-5xl w-full rounded-2xl absolute left-1/2 -translate-x-1/2 top-[43rem] text-shadow-2xl"
                    id="platform"
                    />
                </div>
                <div className="max-w-screen w-full min-h-120 bg-[#EEEEEE] bg-no-repeat bg-fixed rounded-t-2xl linear mt-5 flex items-center justify-center pb-5">
                    <div className="flex flex-col gap-8 p-8" id="about">
                        <h2 className="text-4xl font-bold text-black" data-aos="fade-up" data-aos-duration="2300">Possíveis problemas <br/> que algumas frotas possuem.</h2>
                        <div className="flex gap-8 flex-wrap">
                            <div data-aos="fade-up" data-aos-duration="2300">
                                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                    <div className="border border-solid border-[#fc0000] rounded-full w-13 h-13 flex items-center justify-center">
                                        <PiEyeSlashLight className="text-3xl text-[#fc0000]"/>
                                    </div>
                                    <p className="font-bold text-lg mt-5">Falta de Visibilidade</p>
                                    <p className="mt-5 text-gray-400">Gestores não tem um certo controle de quantos veículos estão disponíveis, em rota ou parados.</p>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="2200">
                                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                    <div className="border border-solid border-[#fc0000] w-13 h-13 flex items-center justify-center rounded-full">
                                        <RiFolderCloseLine className="text-3xl text-[#fc0000]"/>
                                    </div>
                                    <p className="font-bold text-lg mt-5">Viagens Desorganizadas</p>
                                    <p className="mt-5 text-gray-400">Informações de viagens ficam espalhadas em planilhas, mensagens ou anotações manuais.</p>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="2100">
                                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                    <div className="border border-solid border-[#fc0000] w-13 h-13 flex items-center justify-center rounded-full">
                                        <TbTruckOff className="text-3xl text-[#fc0000]"/>
                                    </div>
                                    <p className="font-bold text-lg mt-5">Conflito de Veículos</p>
                                    <p className="mt-5 text-gray-400">O mesmo veículo acaba sendo usado em mais de uma viagem por falta de controle de status.</p>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="2100">
                                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                    <div className="border border-solid border-[#fc0000] w-13 h-13 flex items-center justify-center rounded-full">
                                        <IoIosCloseCircleOutline className="text-3xl text-[#fc0000]"/>
                                    </div>
                                    <p className="font-bold text-lg mt-5">Histórico Difícil de Consultar</p>
                                    <p className="mt-5 text-gray-400">Encontrar viagens antigas, motoristas ou destinos específicos leva tempo e gera erros.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <section className="max-w-screen flex items-center justify-center flex-col bg-[#EEEEEE]" id="proposal">
                <div className="flex flex-col items-center justify-center max-w-4xl">
                    <div className="max-w-4xl flex items-center flex-col mt-20">
                        <h2 className="text-black text-4xl text-center font-bold" data-aos="fade-up" data-aos-duration="3000">Qual a solução do Rota360?</h2>
                        <p className="text-gray-500 mt-5 text-center leading-7" data-aos="fade-up" data-aos-duration="2800">A plataforma foi criada para ajudar micro e pequenas empresas a <br/> organizarem e controlarem veículos e viagens em um único lugar. Com ela, é possível acompanhar o status da frota, gerenciar viagens com mais organização, evitar conflitos de uso e manter um histórico completo para uma operação mais simples, segura e eficiente.</p>
                    </div>
                    <div className="flex flex-wrap mt-15 items-center justify-center gap-9">
                        <div data-aos="zoom-in" data-aos-duration="2700">
                            <div className="max-w-sm bg-white rounded-lg p-10 h-80 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                <div className="bg-[#36e26d] w-13 h-13 flex items-center justify-center rounded-full">
                                    <MdDashboardCustomize className="text-3xl text-black"/>
                                </div>
                                <p className="font-bold text-lg mt-5 text-black">Dashboard</p>
                                <p className="mt-5 text-gray-400">Tenha uma visão operacional imediata da frota. Acompanhe veículos disponíveis, em rota ou fora de operação, além das viagens ativas e concluídas em um único painel.</p>
                            </div>
                        </div>
                        <div data-aos="zoom-in" data-aos-duration="2500">
                            <div className="max-w-sm bg-white rounded-lg p-10 h-80 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                <div className="bg-[#36e26d] w-13 h-13 flex items-center justify-center rounded-full">
                                    <MdOutlineTravelExplore className="text-3xl text-black"/>
                                </div>
                                <p className="font-bold text-lg mt-5 text-black">Viagens</p>
                                <p className="mt-5 text-gray-400">Gerencie todas as viagens do sistema com controle total de origem, destino, motorista, datas e status, garantindo organização e acompanhamento de registros.</p>
                            </div>
                        </div>
                        <div data-aos="zoom-in" data-aos-duration="2300">
                            <div className="max-w-sm bg-white rounded-lg p-10 h-80 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                <div className="bg-[#36e26d] w-13 h-13 flex items-center justify-center rounded-full">
                                    <FaTruck className="text-3xl text-black"/>
                                </div>
                                <p className="font-bold text-lg mt-5 text-black">Veículos</p>
                                <p className="mt-5 text-gray-400">Centralize o cadastro e o status dos veículos da frota. Saiba rapidamente quais estão disponíveis, em rota ou fora de operação, evitando conflitos e uso indevido.</p>
                            </div>
                        </div>
                        <div data-aos="zoom-in" data-aos-duration="2100">
                            <div className="max-w-sm bg-white rounded-lg p-10 h-80 hover:scale-110 duration-300 ease-in-out shadow-2xl">
                                <div className="bg-[#36e26d] w-13 h-13 flex items-center justify-center rounded-full">
                                    <IoDocumentText className="text-3xl text-black"/>
                                </div>
                                <p className="font-bold text-lg mt-5 text-black">Histórico</p>
                                <p className="mt-5 text-gray-400">Consulte facilmente todas as viagens concluídas. Utilize filtros por período, veículo, motorista ou destino para análises rápidas e tomadas de decisão mais seguras.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterHome/>
            </section>
        </div>
    )
}