export interface Cashier {
    id: number;
    name: string;
  }
  
  export interface Product {
    sku: number;
    name: string;
    descr: string;
    price: number;
  }
  
  export interface Sale {
    cashierId: number;
    saleAmount: number;
  }