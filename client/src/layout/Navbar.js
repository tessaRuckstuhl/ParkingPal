import * as React from 'react';
import FaceIcon from '@mui/icons-material/Face';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Bar from '../components/Filter/Bar';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useErrorSnack } from '../contexts/ErrorContext'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AuthService from '../services/auth.service';
import { MainContext } from '../contexts/MainContext';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const Navbar = () => {
  const location = useLocation();
  const { showSnack } = useErrorSnack()
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { jwt, setJwt } = React.useContext(MainContext);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    AuthService.logout();
    setJwt('');
    navigate('/');
  };
  React.useEffect(() => {
    localStorage.getItem('token') !== null ? setLoggedIn(true) : setLoggedIn(false)
    if (location.pathname == "/") {
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  }, [location])

  //delete token from
  // when logged in show:
  {/* parking/create, all, review/create, dashboard, personal */ }


  // when logged off show:
  {/* signup, all */ }

  return (
    <div className="relative flex justify-between items-center px-5 h-[65px] box-border border-b border-lighterGray ">
      <Link to="/">
        <img src="/parkingpal-logo.png" width={30} height={30} alt="Parkingpal logo"></img>
      </Link>
      {/* Filter and Search */}
      {showFilters && <Bar />}
      {/* Language, Profile, .. */}
      <div className="flex space-x-2 items-center">
        <IconButton onClick={() => showSnack('At the moment we only support English, German is coming soon!', 'info')}>
          <LanguageIcon sx={{ fontSize: 20 }} color="secondary" />
        </IconButton>
        <div className="flex space-x-1 border-darkGray rounded-3xl border px-1">
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuIcon sx={{ fontSize: 20 }} color="secondary" />
              <FaceIcon sx={{ fontSize: 20 }} color="secondary" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

            {loggedIn ? 
            <div>
            <MenuItem onClick={() => navigate('/personal')}>
             <Avatar /> Dashboard
           </MenuItem>
           <Divider />
           <MenuItem onClick={() => navigate('/')}>
              <ManageSearchIcon />Book Parking 
            </MenuItem>
           <MenuItem onClick={() => navigate('/parking/create')}>
             <AddLocationAltIcon />
             Host Parking
           </MenuItem>
           <MenuItem onClick={() => navigate('/personal/listings')}>
              <ViewListIcon />Listings
            </MenuItem>
           <MenuItem onClick={() => navigate('/personal/bookings')}>
             <LocalParkingIcon />Bookings
           </MenuItem>
            
            </div>
              : null}
            <Divider />
            {!loggedIn ? <MenuItem onClick={() => navigate('/signup')}>
              <PersonAddIcon />
              Signup
            </MenuItem> : null}
            <MenuItem onClick={() => {
              if (loggedIn) {
                logout()
              }
              else {
                navigate('/login');
              }
            }}>
              {loggedIn ?
                <Logout />
                :
                <Login />
              }
              {loggedIn ? "Logout" : "Login"}
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
