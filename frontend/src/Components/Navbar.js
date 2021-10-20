import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { find_year_api, find_title_api, find_author_api } from "../API";
import SearchCard from './SearchCard';
const axios = require('axios');


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const [searchTxt, setSearchTxt] = useState("");
  const [ss, setSS] = useState(false);
  const [srcRes, setSrcRes] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    else {
      window.location="/";
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

          
  const searchTitle = () => {
    console.log(`${searchTxt}`);
    axios({
      method: "POST",
      url: find_title_api,
      headers: {},
      data: {
        title: searchTxt,
      }
    })
    .then((res) => {
      console.log(res.data);
      setSrcRes(res.data);
      setSS(true);
    })
    .catch((err) => {
      console.log(err);
      alert("No Book Found");
    })
  };

  const searchAuthor = () => {
    console.log(`${searchTxt}`);
    axios({
      method: "POST",
      url: find_author_api,
      headers: {},
      data: {
        author: searchTxt,
      }
    })
    .then((res) => {
      console.log(res.data);
      setSrcRes(res.data);
      setSS(true);
    })
    .catch((err) => {
      console.log(err);
      alert("No Book Found");
    })
  };

  const searchYear = () => {
    console.log(`${searchTxt}`);
    axios({
      method: "POST",
      url: find_year_api,
      headers: {},
      data: {
        year: searchTxt,
      }
    })
    .then((res) => {
      console.log(res.data);
      setSrcRes(res.data);
      setSS(true);
    })
    .catch((err) => {
      console.log(err);
      alert("No Book Found");
    })
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            ><Link to="./" style={{color: 'white', textDecoration: 'none'}}>
              Welcome {user === null ? <b></b> : <b>{user.firstName}</b>}
              </Link>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search By "
                inputProps={{ 'aria-label': 'search' }}
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
              />
              <Button 
                variant="secondary" 
                onClick={() => searchTitle()}>
                  Title
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => searchAuthor()}>
                  Author
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => searchYear()}>
                  Year
              </Button>
            </Search>
            {/* {mod ? 
              modd :
              <b></b>
              } */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {user === null ? <b></b> : (user.isAdmin ? 
                <span>
                <Button variant="secondary" onClick={() => window.location="/addBooks"}>Add a new book</Button>
                <Button variant="secondary" onClick={() => window.location="/updateBooks"}>Update Information</Button>
                </span>
                :
                <Button variant="secondary" onClick={() => window.location="/myBooks"}>Return Book</Button>
              )}
            
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      {ss ? 
        (srcRes === null ? 
          <b>No book found</b> 
          : 
          <div style={{ justifyContent: 'center' }}>
            <SearchCard book={srcRes}  user={user} />
            <div style={{ justifyContent: 'center', width: '10%', margin: 'auto' }}>
              <Button 
                variant="outlined" 
                size="small" 
                style={{ margin: 'auto', justifyContent: 'center', alignItem: 'center' }} 
                onClick={() => {setSS(false); setSearchTxt("")}}>
                Clear Results
              </Button>
            </div>
          </div>) 
          : 
          <b></b>
      }
    </>
  );
}