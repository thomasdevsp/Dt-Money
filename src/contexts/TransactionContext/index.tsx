import { useEffect, useState } from "react"
import { Transaction, TransactionProviderProps } from "./interfaces"
import { TransactionContext } from "./TransactionContext"

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions")
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionContext.Provider
    value={{
      transactions,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}
