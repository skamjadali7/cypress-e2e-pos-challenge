import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { useSalesData } from "../context/SalesDataContext";
import SubmitSalePage from "../pages/SubmitSalePage";

// Mocking the dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../context/SalesDataContext", () => ({
  useSalesData: jest.fn(),
}));

describe("SubmitSalePage", () => {
  const mockNavigate = jest.fn();
  const mockAddSale = jest.fn();
  const mockProducts = [
    { sku: 1, name: "Product 1", descr: "Description 1", price: 10 },
    { sku: 2, name: "Product 2", descr: "Description 2", price: 20 },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ cashierId: "123" });
    (useSalesData as jest.Mock).mockReturnValue({
      products: mockProducts,
      addSale: mockAddSale,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with products", () => {
    render(<SubmitSalePage />);

    expect(screen.getByText("Sale Details")).toBeInTheDocument();
    expect(screen.getByText("Sale")).toBeInTheDocument();
    expect(screen.getByText("Items: 0")).toBeInTheDocument();
    expect(screen.getByText("Cost: $0.00")).toBeInTheDocument();
  });

  it("handles quantity change correctly", () => {
    render(<SubmitSalePage />);

    const incrementButton = screen.getAllByText("+")[0];
    const decrementButton = screen.getAllByText("-")[0];
    const quantityInput = screen.getAllByRole("spinbutton")[0];

    // Initial value should be 0
    expect(quantityInput).toHaveValue(0);

    // Increment quantity
    fireEvent.click(incrementButton);
    expect(quantityInput).toHaveValue(1);

    // Decrement quantity
    fireEvent.click(decrementButton);
    expect(quantityInput).toHaveValue(0);
  });

  it("handles form submission", () => {
    render(<SubmitSalePage />);

    const incrementButton = screen.getAllByText("+")[0];
    fireEvent.click(incrementButton);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Check if addSale was called with the correct arguments
    expect(mockAddSale).toHaveBeenCalledWith({ cashierId: 123, saleAmount: 10 });

    // Check if navigate was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/sales-overview/123");
  });

  it("redirects if cashierId is not present", () => {
    (useParams as jest.Mock).mockReturnValue({});
    render(<SubmitSalePage />);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders Back button correctly", () => {
    render(<SubmitSalePage />);
    const backButton = screen.getByText("← Back");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/sales-overview/123");
  });
});
