import { useContext } from "react"
import { TransactionContext } from "./TransactionContext"

export const useTransactionContext= () => {
  const context = useContext(TransactionContext)
  return context
}
