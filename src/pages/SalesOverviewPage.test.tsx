import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { useNavigate, useParams } from "react-router-dom";
import { useSalesData } from "../context/SalesDataContext";
import SalesOverviewPage from "../pages/SalesOverviewPage";
import SalesChart from "../components/SalesChart/SalesChart";

// Mocking the dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../context/SalesDataContext", () => ({
  useSalesData: jest.fn(),
}));

jest.mock("../components/SalesChart/SalesChart", () => () => <div>SalesChart Component</div>);

describe("SalesOverviewPage", () => {
  const mockNavigate = jest.fn();
  const mockCashiers = [
    { id: 1 },
    { id: 2 },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ cashierId: "1" });
    (useSalesData as jest.Mock).mockReturnValue({
      cashiers: mockCashiers,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with current cashier", () => {
    render(<SalesOverviewPage />);

    expect(screen.getByText("View Sales Dashboard")).toBeInTheDocument();
    expect(screen.getByText("cashier 1")).toBeInTheDocument();
    expect(screen.getByText("Cashier Sales Statistics")).toBeInTheDocument();
    expect(screen.getByText("SalesChart Component")).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText("Switch Cashier")).toBeInTheDocument();
    expect(screen.getByText("Add Sale")).toBeInTheDocument();
  });

  it("navigates to submit sale page when Add Sale button is clicked", () => {
    render(<SalesOverviewPage />);

    const addSaleButton = screen.getByText("Add Sale");
    fireEvent.click(addSaleButton);

    expect(mockNavigate).toHaveBeenCalledWith("/submit-sale/1");
  });

  it("navigates to switch cashier page when Switch Cashier button is clicked", () => {
    render(<SalesOverviewPage />);

    const switchCashierButton = screen.getByText("Switch Cashier");
    fireEvent.click(switchCashierButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("does not render current cashier if cashierId is not found", () => {
    (useParams as jest.Mock).mockReturnValue({ cashierId: "3" });
    render(<SalesOverviewPage />);

    expect(screen.queryByText("cashier 3")).not.toBeInTheDocument();
  });
});
