import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills"; // Import your new section
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      {/* decorative background blobs */}
      <div className="bg-decor" aria-hidden="true">
        <div className="bg-blob one" />
        <div className="bg-blob two" />
      </div>

      <div className="content">
        <Header />
        <main id="main">
          <Home />
          <About />
          <Skills />
          <Projects />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;
