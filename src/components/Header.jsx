import React from 'react';

const Header = ({ currentDate }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">Task Management System</h1>
      <p className="text-sm">Current Date: {currentDate}</p>
    </header>
  );
};

export default Header;
