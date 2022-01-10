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
        height: '100%',
        px: 2,
        pt: 2
      }}
      {...rest}
    >
      <Box sx={{ paddingBottom: 1 }}>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.display_name}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Avatar
            alt="Product"
            src={product.media}
            variant="square"
          />
        </Box>
      </CardContent>
      <Divider />
      <Box>
        <Grid
          container
          // spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 1
            }}
          >
            <Typography
              color="textPrimary"
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
              color="textPrimary"
              display="inline"
              sx={{ pr: 1 }}
              variant="body1"
            >
              {product.price}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{
          display: 'flex',
          flexDirection: 'inline',
          p: 1
        }}>
          <NextLink
            href={{ pathname: '/productinfo', query: btoa(product.id) }}
            passHref
          >
            <Button>
              View
            </Button>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Card>
  )
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
