

import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="text-red-500 bg-red-100 p-4 rounded">
      <p>{message}</p>
    </div>
  );
};

export default Error;
