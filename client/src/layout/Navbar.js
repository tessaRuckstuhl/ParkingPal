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
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = React.useState(false)
   const links = []
  // [{ name: "HOME", link: "/dashboard" },
  // { name: "Login", link: "/login" },
  // { name: "About", link: "/about" },
  // { name: "Review", link: "/parking/review" },
  // { name: "Create Parking", link: "/parking/create" },
  // ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  React.useEffect(() => {
    if(location.pathname == "/"){
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  }, [location])


  return (
    <div className="relative flex justify-between items-center px-5 h-[65px] box-border border-b border-lighterGray ">
        <Link to="/">
          <img src="/parkingpal-logo.png" width={30} height={30} alt="Parkingpal logo"></img>
        </Link>
        {/* Filter and Search */}
        {showFilters && <Bar/>}
        {/* Language, Profile, .. */}
      <div className="flex space-x-2 items-center">
        <IconButton onClick={() => alert('TBD')}>
          <LanguageIcon sx={{ fontSize: 20 }} color="secondary" />
        </IconButton>
        <div className="flex space-x-1 border-darkGray rounded-3xl border px-1">
          <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
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
        <MenuItem onClick={() => navigate('/dashboard')}>
          <Avatar/> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </div>
      <ul className="md:flex md:items-center">
        {links.map(link =>(
          <li key= {link.name} className="md:ml-8 text">
            {/* this doesnt work for some reason  */}
            <a href={link.link} className="text-blue-800 hover:text-gray-400 duration-500">{link.name}</a>
          </li>
        ))}
      </ul>

      </div>
    </div>
  );
};

export default Navbar;
