import { Link } from "react-router"
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
export function Signup(){
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [userName, setUserName] = useState("");

async function createAccount() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: userName,
    });
    toast.success(
      <div>
        <h2 className="text-black font-bold text-sm">Conta Criada</h2>
        <p className="text-gray-400 text-sm">A conta foi criada com sucesso.</p>
      </div>
    );
    navigate("/login");
  } catch (error: any) {
    if (error.code === "auth/weak-password") {
      toast.error(
      <div>
        <h2 className="text-black font-bold text-sm">Senha Fraca</h2>
        <p className="text-gray-400 text-sm">Precisa ter no mínimo 6 caracteres.</p>
      </div>
    );
    } else if (error.code === "auth/email-already-in-use") {
        toast.error(
        <div>
          <h2 className="text-black font-bold text-sm">Email Existente</h2>
          <p className="text-gray-400 text-sm">Esse email já está em uso.</p>
        </div>
    );
    } else {
        toast.error(
        <div>
          <h2 className="text-black font-bold text-sm">Erro</h2>
          <p className="text-gray-400 text-sm">Ocorreu um erro inesperado</p>
        </div>
    );
    }
  }
}
    return(
        <div>
            <main>
                <section className="w-screen flex flex-col items-center justify-center h-screen bg-[#EEEEEE]">
                    <div className="bg-white p-7 rounded-3xl shadow-2xl">
                        <div className="flex flex-col items-center mb-5">
                            <h2 className="font-bold text-black text-2xl flex gap-4 mb-3">Criar Conta</h2>
                            <p className="text-gray-400 tracking-wide font-medium">Crie uma conta e comece a utilizar o Rota360</p>
                        </div>
                        <div className="w-full max-w-md overflow-hidden flex flex-col justify-center">
                            <div className="flex flex-col mb-5.5 relative">
                                <label className="text-gray-400 font-bold mb-2.5">Nome de usuário</label>
                                <FaRegUser className="absolute text-lg text-gray-400 top-11.5 left-3"/>
                                <input type="text" placeholder="Digite um nome de usuário" className="border border-solid border-gray-400/20 rounded-md pt-2 pb-2 pl-12 focus:border-gray-400/40 outline-none text-gray-400" required value={userName} onChange={(e) => setUserName(e.target.value)}/>
                            </div>
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
                                <button className="w-full bg-[#36e26cbe] rounded-lg p-2 mt-4.5 cursor-pointer text-white hover:bg-[#36E26D] duration-700 ease-in-out" onClick={createAccount}>Criar Conta</button>
                                <Link to={"/login"} className="text-gray-400 mt-15">Já possuí uma conta? <span className="text-[#36E26D]">Faça login</span></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}