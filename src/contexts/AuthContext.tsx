import { createContext, useEffect, useState, type ReactNode } from "react";

interface LoginProps{
    login: (data: {}) => void;
    logout: () => void;
    userLoginAuth: boolean;
    loginDetailAuth: {};
    getUserName: (user: string) => void;
    userName: string | null;
    loading: boolean;
}

interface ChildrenProps{
    children: ReactNode
}

export const AuthContext = createContext({} as LoginProps);

const AuthProvider = ({ children }: ChildrenProps) => {
const [userLoginAuth, setUserLoginAuth] = useState(false);
const [loginDetailAuth, setLoginDetailAuth] = useState({});
const [userName, setUserName] = useState<string | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    setUserLoginAuth(auth)
    setLoading(false);
},[])

const login = (userDetails: {}) => {
    localStorage.setItem("auth", "true");
    setUserLoginAuth(true)
    setLoginDetailAuth(userDetails)
}

const logout = () => {
    localStorage.removeItem("auth");
    setUserLoginAuth(false)
    setLoginDetailAuth({})
}

const getUserName = (user: string | null) => {
    setUserName(user)
}

    return(
        <AuthContext.Provider value={{ login, logout, userLoginAuth, loginDetailAuth, userName, getUserName, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }