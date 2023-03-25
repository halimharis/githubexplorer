import React from "react";
import { UserDetail } from "../types/UserDetail";

interface IDetailContext {
    user: UserDetail | null;
    setUser?: (param : string, status : boolean) => void;
}

const DetailContext = React.createContext<IDetailContext>({
    user : null
});

export default DetailContext;