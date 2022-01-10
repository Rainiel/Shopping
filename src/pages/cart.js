import Head from 'next/head';
import React from 'react';
import NextLink from 'next/link';
import { Box, Container, Button } from '@mui/material';
import { CartListResults } from '../components/cart/cart-list-results';
import { CartListToolbar } from '../components/cart/cart-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import Controller from '../__mocks__/products';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Cart = () => {
  const [cart, setCart] = React.useState([]);
  const [selectedCartIds, setSelectedCartIds] = React.useState([]);

  const instance = Controller.getInstance();

  const handleSelectAll = (event) => {
    let newSelectedCartIds;

    if (event.target.checked) {
      newSelectedCartIds = cart.map((Cart) => Cart.id);
    } else {
      newSelectedCartIds = [];
    }

    setSelectedCartIds(newSelectedCartIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCartIds.indexOf(id);
    let newSelectedCartIds = [];

    if (selectedIndex === -1) {
      newSelectedCartIds = newSelectedCartIds.concat(selectedCartIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCartIds = newSelectedCartIds.concat(selectedCartIds.slice(1));
    } else if (selectedIndex === selectedCartIds.length - 1) {
      newSelectedCartIds = newSelectedCartIds.concat(selectedCartIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCartIds = newSelectedCartIds.concat(
        selectedCartIds.slice(0, selectedIndex),
        selectedCartIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCartIds(newSelectedCartIds);
  };

  const handleRemoveProductFromCart = (product) => {
    setCart(cart.filter(item => item !== product));
    instance.removeFromCart(product);
  }

  const handleBuyProduct = (product) => {
    instance.purchaseProduct(product);
    handleRemoveProductFromCart(product);
  }

  const handleBuySelectedItem = () => {
    selectedCartIds.map((itemId) => {
      handleBuyProduct(cart.find(({ id }) => id === itemId));
    });
    setSelectedCartIds([]);
  }

  const handleBuyAll = () => {
    cart.map((product) => {
      instance.purchaseProduct(product);
    });
    instance.emptyCart();
    setCart([]);
  }

  React.useEffect(() => {
    setCart(instance.getCart());
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
          // py: 8
          paddingBottom: 8
        }}
      >
        <Container maxWidth={false}>
          <CartListToolbar
            selectedItemCount={selectedCartIds.length}
            handleBuyAll={handleBuyAll}
            handleBuySelectedItem={handleBuySelectedItem}
          />
          <Box sx={{ mt: 3 }}>
            <CartListResults
              cart={cart}
              handleSelectAll={handleSelectAll}
              handleSelectOne={handleSelectOne}
              selectedCartIds={selectedCartIds}
              handleRemoveProductFromCart={handleRemoveProductFromCart}
              handleBuyProduct={handleBuyProduct}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  )
};

Cart.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Cart;
