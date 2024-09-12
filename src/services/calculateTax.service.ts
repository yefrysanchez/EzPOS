function calculateTax(amount: number, taxPercentage: number): number {
  // Calculate the tax amount
  const taxAmount = (amount * taxPercentage) / 100;

  // Calculate the total amount after tax
  const totalAmount = amount + taxAmount;

  return totalAmount;
}

export default calculateTax;
