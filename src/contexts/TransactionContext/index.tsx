import { useEffect, useState, useCallback } from "react"
import { CreateTransactionInput, Transaction, TransactionProviderProps } from "./interfaces"
import { TransactionContext } from "./TransactionContext"
import { api } from "../../lib/axios"

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { description, price, category, type  } = data

    const response = await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions(transaction => [response.data, ...transaction])
  }, [

  ])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
    value={{
      transactions,
      fetchTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}
