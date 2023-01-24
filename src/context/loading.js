import { createContext } from "react";

export const IsLoading = createContext({
    loading: true,
    setLoading: () => {}
});