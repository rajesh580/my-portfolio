import React from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Certificates />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
