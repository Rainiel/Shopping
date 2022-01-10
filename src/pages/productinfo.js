import Head from 'next/head';
import React from 'react';
import NextLink from 'next/link';
import Controller from '../__mocks__/products';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { ProductProfile } from '../components/productinfo/product-profile';
import { ProductDetails } from '../components/productinfo/product-details';
import { DashboardLayout } from '../components/dashboard-layout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ProductInfo = () => {
  const instance = Controller.getInstance();

  const [product, setProduct] = React.useState({
    id: "",
    display_name:"",
    barcode: "",
    price: "",
    brand: "",
    category: "",
  });

  React.useEffect(() => {
    const productId  = window.location.search.slice(1);
    const getProduct = instance.getProducts().find(({id }) => id == atob(productId));
    setProduct(getProduct);
    console.log(getProduct);
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
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Info
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <ProductProfile product={product} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProductDetails product={product} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
};

ProductInfo.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProductInfo;
