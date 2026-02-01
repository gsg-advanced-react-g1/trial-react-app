import { createContext } from "react";
import type { AuthState } from "../entities/types";

const AuthContext = createContext<AuthState | null>(null);
export default AuthContext;