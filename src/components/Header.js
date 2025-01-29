import React from "react";

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">My Portfolio</h1>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#projects" className="hover:underline">Projects</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
