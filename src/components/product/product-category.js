import React, { useState } from 'react';
import NextLink from 'next/link';
import Controller from '../../__mocks__/products';
import excel from 'xlsx';
import {
  Box,
  Button,
  Typography,
  Grid, Card, CardContent, Avatar
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import Badge from '@mui/material/Badge';

export const ProductCategory = (props) => {

  return (
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
          variant="h6"
        >
          Category
        </Typography>
        <Box sx={{ pb: 3 }}>
          <Grid
            container
            spacing={1}
          >
            {props.category.map((category, i) => (
              <Grid
                item
                key={i}
                lg={2}
                md={3}
                xs={4}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 2,
                    height: '100%',
                  }}
                  onClick={() => props.handleSelectedFilterCategory(category)}
                >
                  <Box>
                    <Avatar
                      alt="Product"
                      variant="square"
                    />
                  </Box>
                  <Box>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h9"
                    >
                      {category}
                    </Typography>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
};
