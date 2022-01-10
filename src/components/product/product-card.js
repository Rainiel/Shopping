import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import Controller from '../../__mocks__/products';

export const ProductCard = ({ product, setCartCount, ...rest }) => {
  const instance = Controller.getInstance();

  const addToCart = () => {
    const cartList = instance.addToCart(product);
    if (cartList) {
      setCartCount();
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Button
          endIcon={(<AddShoppingCartIcon fontSize='small' />)}
          sx={{ mr: 1 }}
          onClick={addToCart}
        >
          Add
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            alt="Product"
            src={product.media}
            variant="square"
          />
        </Box>
        {/* <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h8"
      >
        {product.brand}
      </Typography> */}
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.display_name}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {/* <ClockIcon color="action" /> */}
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {product.brand}{" - "}{product.category}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {"₱"}
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {product.price}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
