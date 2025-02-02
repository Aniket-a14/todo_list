import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-violet-800  p-3 py-4">
      <div className="logo mx-4">
        <span className="font-bold text-white">iTodo</span>
      </div>
      <ul className="flex gap-4 text-white mx-4">
        <li>Home</li>
        <li>Your Tasks</li>
      </ul>
    </div>
  );
};

export default Navbar;
