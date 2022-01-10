import Head from 'next/head';
import React from 'react';
import NextLink from 'next/link';
import { Box, Container, Button } from '@mui/material';
import { PurchaseListToolbar } from '../components/purchasehistory/purchasehistory-list-toolbar';
import { PurchaseListResults } from '../components/purchasehistory/purchasehistory-list-results';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import Controller from '../__mocks__/products';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Purchasehistory = () => {
  const [history, setHistory] = React.useState([]);
  const [totalSpent, setTotalSpent] = React.useState(0);

  const instance = Controller.getInstance();

  const calculateSpent = () => {
    const price = 0;
    instance.getPurchaseHistory().map((val, i) => {
      price = price + parseFloat(val.price);
    });
    setTotalSpent(Math.round(price * 100) / 100);
  }

  React.useEffect(() => {
    setHistory(instance.getPurchaseHistory());
    calculateSpent();
  }, []);

  return (
    <Box>
      <NextLink
        href={"/products"}
        passHref
      >
        <Button
          startIcon={(<ChevronLeftIcon fontSize="small" />)}
          sx={{ ml: 2, mt: 2 }}
        >
          Back to products
        </Button>
      </NextLink>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingBottom: 8
        }}
      >
        <Container maxWidth={false}>
          <PurchaseListToolbar total={totalSpent} />
          <Box sx={{ mt: 3 }}>
            <PurchaseListResults history={history} />
          </Box>
        </Container>
      </Box>
    </Box>
  )
};

Purchasehistory.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Purchasehistory;
