import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from "react-router-dom";
import { useSalesData } from "../context/SalesDataContext";
import ListCashiersPage from "../pages/ListCashiersPage";

// Mocking the dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../context/SalesDataContext", () => ({ 
  useSalesData: jest.fn(),
}));

describe("ListCashiersPage", () => {
  const mockNavigate = jest.fn();
  const mockCashiers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSalesData as jest.Mock).mockReturnValue({
      cashiers: mockCashiers,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with cashiers", () => {
    render(<ListCashiersPage />);

    expect(screen.getByText("List of Cashiers")).toBeInTheDocument();
    expect(screen.getByText("Select Cashier")).toBeInTheDocument();

    // Check if cashier radio buttons are rendered
    mockCashiers.forEach((cashier) => {
      expect(screen.getByLabelText(`Cashier ${cashier.id}`)).toBeInTheDocument();
    });

    // Check if Next button is initially disabled
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("enables Next button when a cashier is selected", () => {
    render(<ListCashiersPage />);

    const cashierRadio = screen.getByLabelText("Cashier 1");
    fireEvent.click(cashierRadio);

    const nextButton = screen.getByText("Next");
    expect(nextButton).not.toBeDisabled();
  });

  it("navigates to the correct page when Next button is clicked", () => {
    render(<ListCashiersPage />);

    const cashierRadio = screen.getByLabelText("Cashier 1");
    fireEvent.click(cashierRadio);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith("/sales-overview/1");
  });

  it("does not navigate when Next button is clicked without selecting a cashier", () => {
    render(<ListCashiersPage />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockNavigate).not.toHaveBeenCalled(); 
  });
});
