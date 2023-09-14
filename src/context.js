import { createContext, useContext, useState } from "react";

export const Inf = createContext();

const Context = ({ children }) => {
    const [role, setRole] = useState(null);

    return (
        <Inf.Provider value={{ role, setRole }}>{children}</Inf.Provider>
    )
}

export const InfState = () => {
    return useContext(Inf);
}