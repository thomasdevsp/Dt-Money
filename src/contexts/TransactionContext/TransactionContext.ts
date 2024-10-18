import { createContext } from "react"
import { Transaction } from "./interfaces"

export interface TransactionContextType {
  transactions: Transaction[];
}

export const TransactionContext = createContext({} as TransactionContextType)
