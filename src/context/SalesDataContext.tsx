import React, { createContext, useContext, useState, ReactNode } from "react";
import { Sale, Cashier, Product } from "../types";
import { cashiers, products, sales as initialSales } from "../stubs/globalData";

interface SalesDataContextType {
  cashiers: Cashier[];
  products: Product[];
  sales: Sale[];
  addSale: (sale: Sale) => void;
}

interface SalesProviderProps {
  children: ReactNode;
}
//SalesProvider to wrap around the application and pass the data
const SalesDataContext = createContext<SalesDataContextType | undefined>(undefined);

export const SalesDataProvider: React.FC<SalesProviderProps> = ({ children }) => {
  const [sales, setSales] = useState<Sale[]>(initialSales);

  const addSale = (sale: Sale) => {
    setSales([...sales, sale]);
    localStorage.setItem("sales", JSON.stringify([...sales, sale]));
  };

  return (
    <SalesDataContext.Provider value={{ cashiers, products, sales, addSale }}>
      {children}
    </SalesDataContext.Provider>
  );
};

export const useSalesData = (): SalesDataContextType => {
  const context = useContext(SalesDataContext);
  if (!context) throw new Error("useSalesData error");
  return context;
};
