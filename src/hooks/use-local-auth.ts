import { useContext } from "react";
import { LocalAuthContext } from "src/context/local-auth-context";

export const useLocalAuth = () => {
    const context = useContext(LocalAuthContext);
    if (!context) {
        throw new Error("useLocalAuth must be used within a LocalAuthProvider");
    }
    return context;
};