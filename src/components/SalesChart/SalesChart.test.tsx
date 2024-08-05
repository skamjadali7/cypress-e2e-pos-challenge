import React from 'react';
import { render } from '@testing-library/react';
import { SalesDataProvider, useSalesData } from '../../context/SalesDataContext'; 
import { sales as initialSales, cashiers, products } from '../../stubs/globalData'; 

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('SalesDataProvider', () => {
  it('should render children and provide sales context', () => {
    const TestComponent: React.FC = () => {
      const salesContext = useSalesData();
      return (
        <>
          <div data-testid="cashiers">{salesContext.cashiers.length}</div>
          <div data-testid="products">{salesContext.products.length}</div>
          <div data-testid="sales">{salesContext.sales.length}</div>
        </>
      );
    };

    const { getByTestId } = render(
      <SalesDataProvider>
        <TestComponent />
      </SalesDataProvider>
    );

    expect(getByTestId('cashiers')).toHaveTextContent(cashiers.length.toString());
    expect(getByTestId('products')).toHaveTextContent(products.length.toString());
    expect(getByTestId('sales')).toHaveTextContent(initialSales.length.toString());
  });
});
