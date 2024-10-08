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


export type AccountType = {
  id: number ,
  name: string ,
  email: string ,
  password: string ,
  taxPercentage: number ,
  firstLogin: boolean ,
  createdAt: Date ;   
};

export type EmployeeType = {
  id: number;
  name: string;
  pin: string;
  isAdmin: boolean;
  accountId: number;
  createdAt: Date;
};

export type CategoryType = {
  id: number,
  name: string,
  accountId : number
  createdAt: Date
}

export type ProductType = {
  id: number,
  name: string,
  price: number,
  categoryId : number
  createdAt: Date
}