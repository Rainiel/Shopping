import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';

export const CartListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Cart
      </Typography>
      <Box sx={{ m: 1 }}>
        <Badge sx={{ mr: 1 }} badgeContent={props.selectedItemCount} color="primary">
          Selected Item
        </Badge>
        <Button
          startIcon={(<ShoppingBagIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={props.handleBuySelectedItem}
        >
          Buy selected product
        </Button>
        <Button
          startIcon={(<ShoppingBagIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={props.handleBuyAll}
        >
          Buy all
        </Button>
        {/* <Button
            color="primary"
            variant="contained"
          >
            Add Cart
          </Button> */}
      </Box>
    </Box>
    {/* <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
  </Box>
);
