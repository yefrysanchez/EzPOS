
interface Product {
    product: string;
    price: number;
    quantity: number;
  }

export function calculateTotal(products: Product[]) {
    let total = 0;

    for (const product of products) {
      // Calculate the total for this product and add it to the overall total
      total += product.price * product.quantity;
    }
  
    return total;

  }