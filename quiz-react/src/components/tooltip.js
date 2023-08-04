import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="tooltip-text w-full text-center mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 invisible absolute bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-200 ease-in-out group-hover:opacity-100 group-hover:visible">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
