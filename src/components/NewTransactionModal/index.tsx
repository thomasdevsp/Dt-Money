import * as Dialog  from "@radix-ui/react-dialog"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import * as zod from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContextSelector } from "use-context-selector"
import { TransactionContext } from "../../contexts/TransactionContext/TransactionContext"

const newTransactionModalFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["outcome", "income"]),
})

type newTransactionFormInputs = zod.infer<typeof newTransactionModalFormSchema>

export function NewTransactionModal() {
  const createTransaction  = useContextSelector(TransactionContext, (context) => {
    return context.createTransaction
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
   } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionModalFormSchema),
    defaultValues: {
      type: "income",
    },
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs){
    const { description, price, category, type } = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })
    reset()
  }

  return (
    <Dialog.Portal>
            <Overlay />

            <Content>

              <Dialog.Title>Nova Transação</Dialog.Title>

              <CloseButton>
                <X size={24}/>
              </CloseButton>

              <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                <input
                type="text"
                placeholder="Descrição"
                required {...register("description")}
                />

                <input
                type="number"
                placeholder="Preço"
                required {...register("price", { valueAsNumber: true })}
                />

                <input
                type="text"
                placeholder="Categoria"
                required {...register("category")}
                />

                <Controller
                control={control}
                name="type"
                render={( { field } ) => {
                  return (
                    <TransactionType onValueChange={field.onChange} value={field.value}>

                    <TransactionTypeButton value="income" variant="income">
                      <ArrowCircleUp size={24} />

                      Entrada
                    </TransactionTypeButton>

                    <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />

                      Saída
                    </TransactionTypeButton>

                </TransactionType>
                  )
                }
                }
                />

                <button type="submit" disabled={isSubmitting}>
                  Cadastrar
                </button>
              </form>

            </Content>
          </Dialog.Portal>
  )
}
