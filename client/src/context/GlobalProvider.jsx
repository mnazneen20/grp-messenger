import React, { createContext, useContext } from "react";
import useUser from "../hooks/useUser";
import useRoom from "../hooks/useRoom";
import { socket } from "../hooks/useUser";

const context = createContext();
export default function GlobalProvider({ children }) {
    const value = { ...useUser(), ...useRoom(), socket };
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
};

export const useGlobalCtx = () => useContext(context);