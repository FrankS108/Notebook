import { createContext } from "react";
import { BlocksContext as InterfaceContext } from "../interfaces/interfaces";
export const BlocksContext = createContext<InterfaceContext>({} as InterfaceContext);