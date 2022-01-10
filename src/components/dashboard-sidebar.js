import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Controller from '../__mocks__/products';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, FormControlLabel, Checkbox, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import eventBus from "../utils/eventBus";

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  // {
  //   href: '/customers',
  //   icon: (<UsersIcon fontSize="small" />),
  //   title: 'Customers'
  // },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Products'
  },
  // {
  //   href: '/account',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Account'
  // },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const instance = Controller.getInstance();

  const [brands, setBrands] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const [filter, setFilter] = React.useState(true);

  const [collapseBrands, setCollapseBrands] = React.useState(false);
  const handleClickBrands = () => {
    setCollapseBrands(!collapseBrands);
  };

  const [collapseCategory, setCollapseCategory] = React.useState(false);
  const handleClickCategory = () => {
    setCollapseCategory(!collapseCategory);
  };

  const handleBrandFilter = (brand) => {
    const selectedIndex = selectedBrands.indexOf(brand);
    let newSelectedBrand = [];

    if (selectedIndex === -1) {
      newSelectedBrand = newSelectedBrand.concat(selectedBrands, brand);
    } else if (selectedIndex === 0) {
      newSelectedBrand = newSelectedBrand.concat(selectedBrands.slice(1));
    } else if (selectedIndex === selectedBrands.length - 1) {
      newSelectedBrand = newSelectedBrand.concat(selectedBrands.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBrand = newSelectedBrand.concat(
        selectedBrands.slice(0, selectedIndex),
        selectedBrands.slice(selectedIndex + 1)
      );
    }
    setSelectedBrands(newSelectedBrand);
    eventBus.dispatch("selectedBrands", newSelectedBrand);
    instance.setSelectedBrandFilter(newSelectedBrand);
  };

  const handleCategoryFilter = (brand) => {
    const selectedIndex = selectedCategory.indexOf(brand);
    let newSelectedCategory = [];

    if (selectedIndex === -1) {
      newSelectedCategory = newSelectedCategory.concat(selectedCategory, brand);
    } else if (selectedIndex === 0) {
      newSelectedCategory = newSelectedCategory.concat(selectedCategory.slice(1));
    } else if (selectedIndex === selectedCategory.length - 1) {
      newSelectedCategory = newSelectedCategory.concat(selectedCategory.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCategory = newSelectedCategory.concat(
        selectedCategory.slice(0, selectedIndex),
        selectedCategory.slice(selectedIndex + 1)
      );
    }
    setSelectedCategory(newSelectedCategory);
    eventBus.dispatch("selectedCategory", newSelectedCategory);
    instance.setSelectedCategoryFilter(newSelectedCategory);
  };

  useEffect(
    () => {

      if (instance.getSelectedBrandFilter().lenght > 0) {
        setSelectedBrands(instance.getSelectedBrandFilter());
      }

      if (instance.getSelectedCategoryFilter().lenght > 0) {
        setSelectedCategory(instance.getSelectedCategoryFilter());
      }

      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  useEffect(
    () => {
      eventBus.on("filterData", (data) => {
        setBrands(data.brands);
        setSelectedBrands(data.brands);
        setCategory(data.category);
        setSelectedCategory(data.category);
      });

      if (instance.getSelectedBrandFilter().lenght > 0) {
        setSelectedBrands(instance.getSelectedBrandFilter());
      }

      if (instance.getSelectedCategoryFilter().lenght > 0) {
        setSelectedCategory(instance.getSelectedCategoryFilter());
      }

      return function cleanupListener() {
        eventBus.remove("filterData");
      }
    }, []);

  const navItems = () => {
    return items.map((item, i) => {
      if (router.asPath == "/products" && item.title == "Products") {
        return <Box key={i}>
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: 0.5,
            py: 0,
            px: 4
          }}>
            <Divider
              sx={{
                borderColor: '#2D3748',
                my: 1
              }}
            />
            <ListItemButton onClick={handleClickBrands}>
              <ListItemText primary="Brands" />
              {collapseBrands ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapseBrands}
              timeout="auto"
              unmountOnExit>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {brands.map((val, i) => {
                  return <FormControlLabel
                    key={i}
                    control={(
                      <Checkbox
                        color="primary"
                        onChange={() => handleBrandFilter(val)}
                        checked={selectedBrands.includes(val)}
                      />
                    )}
                    label={val}
                  />
                })}
              </Box>
            </Collapse>
            <Divider
              sx={{
                borderColor: '#2D3748',
                my: 1
              }}
            />
            <ListItemButton onClick={handleClickCategory}>
              <ListItemText primary="Category" />
              {collapseCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapseCategory}
              timeout="auto"
              unmountOnExit>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {category.map((val, i) => {
                  return <FormControlLabel
                    key={i}
                    control={(
                      <Checkbox
                        color="primary"
                        onChange={() => handleCategoryFilter(val)}
                        checked={selectedCategory.includes(val)}
                      />
                    )}
                    label={val}
                  />
                })}
              </Box>
            </Collapse>
            <Divider
              sx={{
                borderColor: '#2D3748',
                my: 1
              }}
            />
          </Box>
        </Box>
      } else {
        return <NavItem
          key={item.title}
          icon={item.icon}
          href={item.href}
          title={item.title}
        />
      }
    });
  }

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ paddingX: 3, paddingTop: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          {/* <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Acme Inc
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box> */}
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {navItems()}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        {/* <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink>
        </Box> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
