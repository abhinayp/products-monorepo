export const formatToDollars = (amount: number): string => {
  amount = Number(amount)
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
