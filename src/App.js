import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills"; // Import your new section
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div> 
      <Header />
      <Home />
      <About />
      <Skills /> 
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
