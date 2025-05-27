export type PaymentMethods = "deposit" | "pix" | "cash" | "boleto" | "card"

export type ProductDTO = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: PaymentMethods[]
}
