import React from "react";

function Header() {
  return (
    <header className="py-4" style={{ background: 'linear-gradient(90deg,#06b6d4,#7c3aed)' }}>
      <nav className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="text-white font-bold text-lg px-3 py-1 rounded-md shadow-md" style={{ background: 'rgba(255,255,255,0.08)' }}>
            Rajesh
          </div>
          <div className="text-white text-sm opacity-90">Full-Stack Developer</div>
        </div>

        <ul className="flex space-x-3 items-center">
          <li><a href="#home" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Home</a></li>
          <li><a href="#about" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">About</a></li>
          <li><a href="#skills" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Skills</a></li>
          <li><a href="#projects" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Projects</a></li>
          <li><a href="#footer" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Contact</a></li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
