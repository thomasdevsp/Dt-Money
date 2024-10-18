import { ReactNode } from "react"

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export interface TransactionProviderProps {
  children: ReactNode;
}
