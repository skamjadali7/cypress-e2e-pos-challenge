import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { useSalesData } from '../../context/SalesDataContext';
import { Box } from '@mui/material';

const SalesChart: React.FC = () => {
  const { cashiers, sales } = useSalesData();
  
//Cashier data mapping to add to the bar chart
  const data = cashiers.map((cashier, index) => {
    const totalSalesAmount = sales
      .filter(sale => sale.cashierId === cashier.id)
      .reduce((sum, sale) => sum + sale.saleAmount, 0);
    return {
      name: `cashier ${cashier.id}`,
      totalSalesAmount,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    };
  });

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    margin="0 auto"
  >
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalSalesAmount" fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
    </Box>
  );
};
export default SalesChart;

