export const dateFormater = new Intl.DateTimeFormat("pt-br")

export const priceFormater = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRl",
})
