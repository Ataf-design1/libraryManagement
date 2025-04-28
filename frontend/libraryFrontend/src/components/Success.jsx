
import React from 'react';

const Success = ({ message }) => {
  return (
    <div className="text-green-500 bg-green-100 p-4 rounded">
      <p>{message}</p>
    </div>
  );
};

export default Success;
