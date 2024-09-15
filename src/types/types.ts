export type cartItemType = {
    id: number;
    name: string;
    price: number;
    category: string;
    qty: number;
  };
  
export type cartType = {
    cart: cartItemType[];
    taxPorcentage: number;
  };