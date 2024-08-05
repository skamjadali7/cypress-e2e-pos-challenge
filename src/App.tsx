import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SalesDataProvider } from './context/SalesDataContext';
import ListCashiersPage from './pages/ListCashiersPage';
import SalesOverviewPage from './pages/SalesOverviewPage';
import SubmitSalePage from './pages/SubmitSalePage';

//App routing and Context wrapping to provide data to the application
const App: React.FC = () => {
  return (
    <SalesDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListCashiersPage />} />
          <Route path="/sales-overview/:cashierId" element={<SalesOverviewPage />} />
          <Route path="/submit-sale/:cashierId" element={<SubmitSalePage />} />
        </Routes>
      </Router>
    </SalesDataProvider>
  );
};

export default App;
