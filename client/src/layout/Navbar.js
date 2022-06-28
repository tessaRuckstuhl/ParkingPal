import React, {useEffect, useState} from 'react';
import FaceIcon from '@mui/icons-material/Face';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Bar from '../components/Filter/Bar';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const [showFilters, setShowFilters] = useState(false)
  useEffect(() => {
    console.log(location)
    if(location.pathname == "/map"){
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  

  }, [location])
  
  return (
    <div className="flex justify-between items-center px-5 h-[65px] box-border border-b border-lighterGray ">
        <Link to="dashboard">
          <img src="/parkingpal-logo.png" width={30} height={30} alt="Parkingpal logo"></img>
        </Link>
        {/* Filter and Search */}
        {showFilters && <Bar/>}
        {/* Language, Profile, .. */}
      <div className="flex space-x-4 items-center">
        <Link to="404">
          <div className="text-xs">Become a host</div>
        </Link>
        <IconButton onClick={() => alert('TBD')}>
          <LanguageIcon sx={{ fontSize: 20 }} color="secondary" />
        </IconButton>
        <div className="flex space-x-1 border-darkGray rounded-3xl border px-1">
          <IconButton onClick={() => alert('TBD')} className='flex space-x-1'>
            <MenuIcon sx={{ fontSize: 20 }} color="secondary" />
            <FaceIcon sx={{ fontSize: 20 }} color="secondary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
