import { MagnifyingGlass } from "phosphor-react"
import { SearchFormContainer } from "./styles"
import { useForm } from "react-hook-form"
import *  as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContextSelector } from "use-context-selector"
import { TransactionContext } from "../../../../contexts/TransactionContext/TransactionContext"

const SearchFormSchema = zod.object({
 query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof SearchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionContext, (context) => {
    return context.fetchTransactions
  })

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    },
   } = useForm<SearchFormInputs>({
    resolver: zodResolver(SearchFormSchema),
  })

  async function handleSearchTransactions({ query }: SearchFormInputs) {
    await fetchTransactions(query)

  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
      type="text"
      placeholder="Busque por transações"
      {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
