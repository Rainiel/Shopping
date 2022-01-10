import Head from 'next/head';
import React from 'react';
import Controller from '../__mocks__/products';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import eventBus from "../utils/eventBus";


const Products = () => {
  const [columns, setColumns] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(1);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const instance = Controller.getInstance();

  const handleCbCartCount = () => {
    setCartCount(cartCount + 1);
  }

  const setProductState = (list) => {
    const initBrands = [];
    const initCategory = [];
    setProducts(list.map((val, index) => {
      if (!initBrands.includes(val.brand) && !brands.includes(val.brand)) {
        initBrands.push(val.brand);
      }
      if (!initCategory.includes(val.category) && !category.includes(val.category)) {
        initCategory.push(val.category);
      }
      if (!products.includes(val)) {
        return val;
      }
    }));
    setBrands([...brands, ...initBrands]);
    setCategory([...category, ...initCategory]);
    setSelectedBrands(initBrands);
    setSelectedCategory(initCategory);
    instance.addProducts(list);
    eventBus.dispatch("filterData", { brands: initBrands, category: initCategory });
  }

  const handleOnChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageCount = () => {
    const itemCount = 51;
    const result = products.length / itemCount;
    if (result >= 1) {
      setPageCount(Math.floor(result));
    } else {
      setPageCount(1);
    }
  }

  React.useEffect(() => {
    handlePageCount();
  }, [products]);

  React.useEffect(() => {
    const savedProduct = instance.getProducts();
    setProducts(savedProduct.filter((product) => selectedBrands.some(o2 => product.brand === o2)).filter((product) => selectedCategory.some(o2 => product.category === o2)));
  }, [selectedBrands, selectedCategory]);


  React.useEffect(() => {
    setProducts(instance.getProducts());
    if (instance.getCart().length > 0) {
      setCartCount(instance.getCart().length);
    }


    eventBus.on("selectedBrands", (data) => {
      setSelectedBrands(data);
    });

    eventBus.on("selectedCategory", (data) => {
      setSelectedCategory(data);
    });
  }, []);

  return <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        paddingBottom: 8,
        paddingTop: 2
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar
          setProductState={setProductState}
          productsLength={products.length}
          cartCount={cartCount} />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.slice(page * 51, (page + 1) * 51).map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} setCartCount={handleCbCartCount} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={pageCount}
            // size="small"
            onChange={handleOnChangePage}
          />
        </Box>
      </Container>
    </Box>
  </>
};

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
