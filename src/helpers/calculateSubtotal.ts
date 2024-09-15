type cartItemType = {
  id: number;
  name: string;
  price: number;
  category: string;
  qty: number;
};

export function calculateTotal(products: cartItemType[]) {
    let total = 0;

    for (const product of products) {
      // Calculate the total for this product and add it to the overall total
      total += product.price * product.qty;
    }
  
    return total;

  }