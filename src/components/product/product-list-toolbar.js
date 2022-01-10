import React, { useState } from 'react';
import NextLink from 'next/link';
import Controller from '../../__mocks__/products';
import excel from 'xlsx';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import Badge from '@mui/material/Badge';

export const ProductListToolbar = (props) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    props.setProductState(list);
  }

  const handleClickImport = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {

      /* Parse data */
      const bstr = evt.target.result;
      const wb = excel.read(bstr, { type: 'binary' });

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const data = excel.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(fileUploaded);
    event.target.value = null;
  };

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
          variant="h4"
        >
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            style={{ display: 'none' }}
            ref={hiddenFileInput}
            onChange={handleChange}
          />
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={handleClickImport}
          >
            Import
          </Button>
          {/* <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button> */}
          <NextLink
            href={"/cart"}
            passHref
          >
            <Button
              startIcon={(<ShoppingCartIcon fontSize="small" />)}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={props.cartCount} color="primary">
                View Cart
              </Badge>
            </Button>
          </NextLink>
          <NextLink
            href={"/purchasehistory"}
            passHref
          >
            <Button
              startIcon={(<HistoryIcon fontSize="small" />)}
              sx={{ mr: 1 }}
            >
              Purchase History
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Box>
  )
};
