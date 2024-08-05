import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useSalesData } from "../context/SalesDataContext";
import DefaultPageLayout from "../components/DefaultPageLayout/DefaultPageLayout";

const ListCashiersPage: React.FC = () => {
  const navigate = useNavigate();
  const { cashiers } = useSalesData();
  const [selectedCashier, setSelectedCashier] = useState<string | null>(null);
//Change event of button options
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCashier(e.target.value);
  };
//Submit and navigate by passing the cashierId
  const handleNext = () => {
    if (selectedCashier) {
      navigate(`/sales-overview/${selectedCashier}`);
    }
  };

  return (
    <DefaultPageLayout pageTitle="List of Cashiers">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f0f0f0"
      >
        <Paper
          elevation={3}
          style={{ padding: "20px", textAlign: "center", minWidth: "300px" }}
        >
          <Typography variant="h5" gutterBottom>
            Select Cashier
          </Typography>
          <RadioGroup value={selectedCashier} onChange={handleChange}>
            {cashiers.map((cashier) => (
              <FormControlLabel
                key={cashier.id}
                value={String(cashier.id)}
                control={<Radio />}
                label={`Cashier ${cashier.id}`}
                style={{
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor:
                    selectedCashier === String(cashier.id)
                      ? "#e0e0e0"
                      : "white",
                }}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!selectedCashier}
            style={{ marginTop: "20px" }}
          >
            Next
          </Button>
        </Paper>
      </Box>
    </DefaultPageLayout>
  );
};

export default ListCashiersPage;
