import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid, Card, Avatar
} from '@mui/material';

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
