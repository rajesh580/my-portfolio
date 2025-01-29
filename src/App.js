import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills"; // Import your new section
import Footer from "./components/Footer";

function App() {
  return (
    <div> 
      <Home />
      <About />
      <Skills /> 
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
