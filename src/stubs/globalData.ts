import { Cashier, Product, Sale } from "../types";

export const cashiers: Cashier[] = [
  { id: 1, name: "Cashier 1" },
  { id: 2, name: "Cashier 2" },
  { id: 3, name: "Cashier 3" }
];

export const products: Product[] = [
  { sku: 1, name: "Apple", descr: "Top Red", price: 1.01 },
  { sku: 2, name: "Orange", descr: "Extra Juicy", price: 2.02 },
  { sku: 3, name: "Strawberries", descr: "Freshly Picked", price: 3.03 }
];

export const sales: Sale[] = [
  { cashierId: 1, saleAmount: 100.00 },
  { cashierId: 1, saleAmount: 200.00 },
  { cashierId: 2, saleAmount: 500.00 },
  { cashierId: 1, saleAmount: 150.00 },
  { cashierId: 3, saleAmount: 300.00 }
];
