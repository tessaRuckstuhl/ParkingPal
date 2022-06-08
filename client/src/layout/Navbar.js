import React from 'react';
import FaceIcon from '@mui/icons-material/Face';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
const Navbar = () => {
  return (
    <div className="flex justify-between py-2 px-5">
      <div className="w-6 h-6">
        <Link to="dashboard">
          <img src="./parkingpal-logo.png" alt="Parkingpal logo"></img>
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="404">
          <div className="text-xs">Become a host</div>
        </Link>
        <IconButton onClick={() => alert('TBD')}>
          <LanguageIcon sx={{ fontSize: 20 }} color="secondary" />
        </IconButton>
        <div className="flex space-x-1 border-darkGray rounded-3xl border px-2">
          <IconButton onClick={() => alert('TBD')}>
            <MenuIcon sx={{ fontSize: 20 }} color="secondary" />
          </IconButton>
          <IconButton onClick={() => alert('TBD')}>
            <FaceIcon sx={{ fontSize: 20 }} color="secondary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
