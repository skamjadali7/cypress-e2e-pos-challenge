import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { SalesDataProvider, useSalesData } from "./SalesDataContext";

describe("SalesDataContext", () => {
  const MockComponent: React.FC = () => {
    const { cashiers, products, sales, addSale } = useSalesData();
    return (
      <div>
        <h1>Cashiers: {cashiers.length}</h1>
        <h1>Products: {products.length}</h1>
        <h1>Sales: {sales.length}</h1>
      </div>
    );
  };

  it("renders children with context values", () => {
    const { getByText } = render(
      <SalesDataProvider>
        <MockComponent />
      </SalesDataProvider>
    );

    expect(getByText("Cashiers: 3")).toBeInTheDocument();
    expect(getByText("Products: 3")).toBeInTheDocument();
    expect(getByText("Sales: 5")).toBeInTheDocument();
  });
});
