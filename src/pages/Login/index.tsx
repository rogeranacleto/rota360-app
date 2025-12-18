import { Link } from "react-router"
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
export function Login(){
const { login } = useContext(AuthContext);
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [userLoginDetail, setUserLoginDetail] = useState({});

const navigate = useNavigate();

async function loginUser(){
    await signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
            setUserLoginDetail({
                uid: value.user.uid,
                email: value.user.email,
            })
            toast.success(
            <div>
                <h2 className="text-black font-bold text-sm">Login Efetuado</h2>
                <p className="text-gray-400 text-sm">Login efetuado com sucesso.</p>
            </div>
            )
            navigate("/admin/dashboard")
            login(userLoginDetail)

        }).catch((erro) => {
            if(erro){
                toast.error(
                <div>
                    <h2 className="text-black font-bold text-sm">Erro no Login</h2>
                    <p className="text-gray-400 text-sm">Ocorreu um erro nas credenciais.</p>
                </div>
                )
            }       
        })
}
    return(
        <div>
            <main>
                <section className="w-screen flex flex-col items-center justify-center h-screen bg-[#EEEEEE]">
                    <div className="bg-white p-7 rounded-3xl shadow-2xl">
                        <div className="flex flex-col items-center mb-5">
                            <h2 className="font-bold text-black text-2xl flex gap-4 mb-3">Rota360</h2>
                            <p className="text-gray-400 tracking-wide font-medium">Faça login com sua conta para utilizar o sistema</p>
                        </div>
                        <div className="w-full max-w-md overflow-hidden flex flex-col justify-center">
                            <div className="flex flex-col mb-5.5 relative">
                                <label className="text-gray-400 font-bold mb-2.5">Email</label>
                                <MdOutlineEmail className="absolute text-2xl text-gray-400 top-11 left-3"/>
                                <input type="text" placeholder="nome@exemplo.com" className="border border-solid border-gray-400/20 rounded-md pt-2 pb-2 pl-12 focus:border-gray-400/40 outline-none text-gray-400" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="flex flex-col relative">
                                <label className="text-gray-400 font-bold mb-2.5">Senha</label>
                                <TbLockPassword className="absolute text-2xl text-gray-400 top-10.5 left-3"/>
                                <input type="password" placeholder="Digite sua senha" className="border border-solid border-gray-400/20 rounded-md pt-2 pb-2 pl-12 focus:border-gray-400/40 outline-none text-gray-400" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="flex flex-col items-center">
                                <button className="w-full bg-[#36e26cbe] rounded-lg p-2 mt-4.5 cursor-pointer text-white hover:bg-[#36E26D] duration-700 ease-in-out" onClick={loginUser}>Entrar</button>
                                <Link to={"/signup"} className="text-gray-400 mt-15">Não possui uma conta? <span className="text-[#36E26D]">Crie uma conta</span></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}