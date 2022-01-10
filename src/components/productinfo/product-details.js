import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Typography
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Controller from '../../__mocks__/products';

export const ProductDetails = ({ product, ...rest }) => {
  const instance = Controller.getInstance();

  return (
    <form
      autoComplete="off"
      noValidate
      {...rest}
    >
      <Card>
        <Box sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'inline',
        }}>
          <Typography
            color="textPrimary"
            variant="h5"
            flex={1}
          >
            {product.display_name}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {"₱"}{product.price}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              {"Product Info"}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h7"
            >
              {"Brand: "}{product.brand}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h7"
            >
              {"Category: "}{product.category}
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Divider />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              {"Shipping"}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h7"
            >
              {"Shipping to: "}{"Metro Manila"}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h7"
            >
              {"Shipping fee: "}{"₱50"}
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Divider />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              {"Variants"}
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'inline',
            }}>
              <Avatar
                alt="Product"
                variant="square"
                sx={{
                  mr: 2
                }}
              />
              <Avatar
                alt="Product"
                variant="square"
                sx={{
                  mr: 2
                }}
              />
              <Avatar
                alt="Product"
                variant="square"
                sx={{
                  mr: 2
                }}
              />
              <Avatar
                alt="Product"
                variant="square"
                sx={{
                  mr: 2
                }}
              />
              <Avatar
                alt="Product"
                variant="square"
                sx={{
                  mr: 2
                }}
              />
              <Avatar
                alt="Product"
                variant="square"
                sx={{
                  mr: 2
                }}
              />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            p: 2
          }}
        >
          <Button
            variant="contained"
            startIcon={(<ShoppingCartIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={() => instance.addToCart(product)}
          >
            Add To Cart
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => instance.purchaseProduct(product)}
          >
            Buy
          </Button>
        </Box>
      </Card>
    </form >
  );
};
