import React from 'react';
const Marker = (props) => {
  const { name } = props;
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };
  return (
    <div
      onClick={handleClick}
      className="w-28 h-7 bg-offWhite text-black rounded-xl hover:bg-purple"
    >
      {name}
    </div>
  );
};

export default Marker;
