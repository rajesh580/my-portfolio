import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import ScrollBackground from './components/layout/ScrollBackground';
import certificates from './data/certificates.json';
import projects from './data/projects.json';

const resolvePublicImage = (imageUrl) => {
  if (!imageUrl || /^https?:\/\//i.test(imageUrl)) return null;
  const publicPath = imageUrl.replace(/^\/+/, '');
  return `${process.env.PUBLIC_URL}/${publicPath}`;
};

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (img.decode) {
        img.decode().catch(() => {}).finally(resolve);
        return;
      }
      resolve();
    };
    img.onerror = resolve;
    img.src = src;
  });

function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const preloadAssets = useMemo(() => {
    const localProjectImages = projects
      .map((project) => resolvePublicImage(project.imageUrl))
      .filter(Boolean);

    const localCertificateImages = certificates
      .map((cert) => resolvePublicImage(cert.imageUrl))
      .filter(Boolean);

    return Array.from(new Set([
      `${process.env.PUBLIC_URL}/images/profile.jpg`,
      ...localProjectImages,
      ...localCertificateImages,
    ]));
  }, []);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const minimumLoadTime = new Promise((resolve) => setTimeout(resolve, 1800));

    const imageLoads = preloadAssets.map((src) =>
      preloadImage(src).then(() => {
        loadedCount += 1;
        if (isMounted) {
          setLoadingProgress((loadedCount / preloadAssets.length) * 100);
        }
      })
    );

    Promise.all([Promise.all(imageLoads), minimumLoadTime]).then(() => {
      if (isMounted) {
        setLoadingProgress(100);
        setAssetsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [preloadAssets]);

  return (
    <div className="relative isolate">
      <AnimatePresence>
        {!assetsReady && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>
      <ScrollBackground />
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
