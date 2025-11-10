import React from 'react';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
// FIX: Import the new Certificates component
import Certificates from './components/Certificates'; 
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

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