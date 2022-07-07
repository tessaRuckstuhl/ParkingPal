import { ChevronRight } from '@mui/icons-material';
import { Divider } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Tile = (props) => {
    console.log(props)
  const { title, link, description, Icon, ownerId } = props;
  return (
    <div className="w-1/3 p-2 border border-lighterGray rounded-2xl shadow-bar text-center grid grid-flow-row gap-3 grid-rows-3">
      <div>
        <div className=" mb-2 text-xl">{title}</div> <Divider />
      </div>
      <Icon sx={{ fontSize: 40, justifySelf: 'center' }} />
      <div className="text-lightGray text-sm">{description}</div>
      <Link to={link} state={{ownerId:ownerId}}>
        <div className="text-sm text-purple hover:underline hover:cursor-pointer">
          {`VIEW ${title.toUpperCase()}`} <ChevronRight />
        </div>
      </Link>
    </div>
  );
};

export default Tile;
