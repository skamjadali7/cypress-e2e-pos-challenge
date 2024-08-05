import React, { useState } from "react";
import { useSalesData } from "../context/SalesDataContext";
import { Product, Sale } from "../types";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DefaultPageLayout from "../components/DefaultPageLayout/DefaultPageLayout";

const SubmitSalePage: React.FC = () => {
  const { cashierId } = useParams<{ cashierId: string }>();
  const navigate = useNavigate();

  const { products, addSale } = useSalesData();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  //Null check
  if (!cashierId) {
    navigate("/");
    return null;
  }
//Change quantity of items
  const handleChange = (sku: number, quantity: number) => {
    if (quantity >= 0) {
      setQuantities({ ...quantities, [sku]: quantity });
    }
  };
//Submit the data and pass the updated amount to add up to the cashier sale
  const handleSubmit = () => {
    const saleAmount = products.reduce((total, product) => {
      const quantity = quantities[product.sku] || 0;
      return total + product.price * quantity;
    }, 0);

    const newSale: Sale = { cashierId: Number(cashierId), saleAmount };
    addSale(newSale);
    navigate(`/sales-overview/${cashierId}`);
  };

  const totalItems = products.reduce(
    (sum, product) => sum + (quantities[product.sku] || 0),
    0
  );
  const totalCost = products.reduce(
    (sum, product) => sum + product.price * (quantities[product.sku] || 0),
    0
  );

  return (
    <DefaultPageLayout pageTitle="Sale Details">
      <Box
        sx={{
          width: "60%",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            onClick={() => navigate(`/sales-overview/${cashierId}`)}
          >
            &larr; Back
          </Button>
          <Typography variant="h4" gutterBottom>
            Sale
          </Typography>
          <Box>
            <Typography variant="h6">Items: {totalItems}</Typography>
            <Typography variant="h6">Cost: ${totalCost.toFixed(2)}</Typography>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((pdt) => (
                <TableRow key={pdt.sku}>
                  <TableCell>
                    {pdt.name}
                    <br />
                    {pdt.descr}
                  </TableCell>
                  <TableCell>${pdt.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        fontsize: "20px",
                        backgroundColor: "red", 
                        color: "white",
                        "&:hover": {
                          backgroundColor: "red", 
                        },
                      }}
                      onClick={() =>
                        handleChange(pdt.sku, (quantities[pdt.sku] || 0) - 1)
                      }
                      disabled={(quantities[pdt.sku] || 0) === 0}
                    >
                      -
                    </Button>
                    <TextField
                      type="number"
                      value={quantities[pdt.sku] || 0}
                      onChange={(e) =>
                        handleChange(pdt.sku, parseInt(e.target.value))
                      }
                      variant="outlined"
                      size="small"
                      sx={{ width: "70px", margin: "0 20px" }}
                    />
                    <Button
                      sx={{
                        backgroundColor: "green",
                        color: "white", 
                        "&:hover": {
                          backgroundColor: "green",
                        },
                      }}
                      onClick={() =>
                        handleChange(pdt.sku, (quantities[pdt.sku] || 0) + 1)
                      }
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>
                    ${(pdt.price * (quantities[pdt.sku] || 0)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </DefaultPageLayout>
  );
};

export default SubmitSalePage;
