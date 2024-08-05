import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, Avatar } from "@mui/material";
import { useSalesData } from "../context/SalesDataContext";
import SalesChart from "../components/SalesChart/SalesChart";
import DefaultPageLayout from "../components/DefaultPageLayout/DefaultPageLayout";

const SalesOverviewPage: React.FC = () => {
  const { cashierId } = useParams<{ cashierId: string }>();
  const navigate = useNavigate();
  const { cashiers } = useSalesData();
//Submit and navigate with cashierId
  const handleSubmit = () => {
    navigate(`/submit-sale/${cashierId}`);
  };

  const handleSwitch = () => {
    navigate("/");
  };

  const currentCashier = cashiers.find(
    (cashier) => cashier.id === parseInt(cashierId!, 10)
  );

  return (
    <DefaultPageLayout pageTitle="View Sales Dashboard">
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        {currentCashier && (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            marginBottom="20px"
          >
            <Avatar alt={`cashier ${currentCashier.id}`} src="" />
            <Typography variant="h6" style={{ marginLeft: "10px" }}>
              cashier {currentCashier.id}
            </Typography>
          </Box>
        )}
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Cashier Sales Statistics
        </Typography>
        {/*Sales chart component to show the sales data*/}
        <SalesChart />
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Button variant="outlined" onClick={handleSwitch}>
            Switch Cashier
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Sale
          </Button>
        </Box>
      </Paper>
    </DefaultPageLayout>
  );
};

export default SalesOverviewPage;
