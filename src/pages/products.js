import React from 'react';
import Controller from '../__mocks__/products';
import { Box, Container, Grid, Pagination, Button, Typography } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCategory } from '../components/product/product-category';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import eventBus from "../utils/eventBus";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const Products = () => {
  const [brands, setBrands] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  const [purchaseCount, setPurchaseCount] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(1);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState(null);

  const instance = Controller.getInstance();

  const handleSelectedFilterCategory = (category) => {
    setSelectedFilterCategory(category);
    instance.setSelectedBoxCategory(category);
    eventBus.dispatch("selectedFilterCategory", category);
  }

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
    setSelectedBrands([...selectedBrands, ...initBrands]);
    setSelectedCategory([...selectedCategory, ...initCategory]);
    instance.setSelectedBrandFilter(initBrands);
    instance.setSelectedCategoryFilter(initCategory);
    instance.addProducts(list);
    instance.setCategory(initCategory);
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
    if (selectedFilterCategory != null) {
      setProducts(savedProduct.filter((product) => selectedBrands.some(o2 => product.brand === o2)).filter((product) => selectedFilterCategory == product.category));
    } else {
      setProducts(savedProduct.filter((product) => selectedBrands.some(o2 => product.brand === o2)).filter((product) => selectedCategory.some(o2 => product.category === o2)));
    }
  }, [selectedBrands, selectedCategory, selectedFilterCategory]);

  React.useEffect(() => {
    setProducts(instance.getProducts().filter((product) => instance.getSelectedBrandFilter().some(o2 => product.brand === o2)).filter((product) => instance.getSelectedCategoryFilter().some(o2 => product.category === o2)));
    if (instance.getCart().length > 0) {
      setCartCount(instance.getCart().length);
    }

    if (instance.getPurchaseHistory().length > 0) {
      setPurchaseCount(instance.getPurchaseHistory().length);
    }

    setSelectedBrands(instance.getSelectedBrandFilter());
    setSelectedCategory(instance.getSelectedCategoryFilter());
    setSelectedFilterCategory(instance.getSelectedBoxCategory());
    setCategory(instance.getCategory());

    eventBus.on("selectedBrands", (data) => {
      setSelectedBrands(data);
    });

    eventBus.on("selectedCategory", (data) => {
      setSelectedCategory(data);
    });

    return function cleanupListener() {
      eventBus.remove("selectedBrands");
      eventBus.remove("selectedCategory");
    }
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
        {selectedFilterCategory == null ?
          <ProductCategory category={category} handleSelectedFilterCategory={handleSelectedFilterCategory} />
          :
          <Box sx={{
            display: 'flex',
            flexDirection: 'inline',
            alignItems: 'center'
          }}>
            <Button
              startIcon={(<ChevronLeftIcon fontSize="small" />)}
              sx={{ mr: 2 }}
              onClick={() => handleSelectedFilterCategory(null)}
            >
              See All Category
            </Button>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {selectedFilterCategory}
            </Typography>
          </Box>
        }
        <ProductListToolbar
          setProductState={setProductState}
          productsLength={products.length}
          cartCount={cartCount}
          purchaseCount={purchaseCount} />
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
