import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const CartListResults = ({ cart, handleSelectOne, handleSelectAll, selectedCartIds, handleRemoveProductFromCart, handleBuyProduct, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCartIds.length === cart.length}
                    color="primary"
                    indeterminate={
                      selectedCartIds.length > 0
                      && selectedCartIds.length < cart.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Brand
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.slice(page * limit, (page + 1) * limit).map((Cart) => (
                <TableRow
                  hover
                  key={Cart.id}
                  selected={selectedCartIds.indexOf(Cart.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCartIds.indexOf(Cart.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Cart.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {Cart.display_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {Cart.price}
                  </TableCell>
                  <TableCell>
                    {Cart.brand}
                  </TableCell>
                  <TableCell>
                    {Cart.category}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button onClick={() => handleBuyProduct(Cart)}>Buy</Button>
                      <Button color="error" onClick={() => handleRemoveProductFromCart(Cart)}>Remove</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={cart.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};