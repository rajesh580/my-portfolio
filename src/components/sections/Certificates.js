import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import certificates from '../../data/certificates.json';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scaleIn, viewportOnce } from '../../utils/animations';
import SectionMotionObjects from '../layout/SectionMotionObjects';

function Certificates() {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef(null);
  const viewportRef = useRef(null);
  const sectionRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const xRange = shouldReduceMotion ? [0, 0] : [0, -maxScroll];
  const rawX = useTransform(scrollYProgress, [0, 1], xRange);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.35 });
  const headingY = useTransform(scrollYProgress, [0, 0.16, 0.88, 1], shouldReduceMotion ? [0, 0, 0, 0] : [24, 0, 0, -18]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0.72, 1, 1, 0.72]);
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  useEffect(() => {
    const carousel = carouselRef.current;
    const viewport = viewportRef.current;
    if (!carousel || !viewport) return;

    const updateMaxScroll = () => {
      setMaxScroll(Math.max(0, carousel.scrollWidth - viewport.clientWidth));
    };

    updateMaxScroll();

    const resizeObserver = new ResizeObserver(updateMaxScroll);
    resizeObserver.observe(carousel);
    resizeObserver.observe(viewport);
    window.addEventListener('resize', updateMaxScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, []);

  const certificatePlaceholder = 'https://placehold.co/800x600/111827/9CA3AF?text=Certificate+Preview';
  const getCertificateImage = (cert) => {
    if (!cert) return certificatePlaceholder;
    if (cert.imageUrl) {
      if (!/^https?:\/\//i.test(cert.imageUrl)) {
        const publicPath = cert.imageUrl.replace(/^\/+/, '');
        return `${process.env.PUBLIC_URL}/${publicPath}`;
      }
      return cert.imageUrl;
    }
    if (cert.githubLink) {
      const match = cert.githubLink.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) return `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}`;
    }
    return certificatePlaceholder;
  };

  return (
    // Use theme-aware colors: bg-background
    <section
      id="certificates"
      ref={sectionRef}
      className="relative h-[320vh] bg-background/30"
    >
      <SectionMotionObjects variant="certificates" />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ scaleX: progressScaleX }}
          className="absolute left-0 top-0 h-1 w-full origin-left bg-primary"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ y: headingY, opacity: headingOpacity }}
          className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
              Certifications
            </p>
            <h2 className={`text-3xl sm:text-4xl font-display font-bold text-text ${theme === 'neon' ? 'text-glow' : ''}`}>
              Licenses & Certificates
            </h2>
          </div>

          <p className="max-w-xl text-sm sm:text-base text-text-muted">
            A curated set of learning milestones and professional credentials, presented in a smooth horizontal showcase.
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          ref={viewportRef}
          className="overflow-hidden px-0 py-1"
        >
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex w-max gap-4 pb-1"
          >
            {certificates.map((cert, index) => (
              <motion.article
                key={cert.id}
                variants={fadeUp}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.035, ease: 'easeOut' }}
                whileHover={{
                  y: -10,
                  scale: 1.025,
                  rotate: index % 2 === 0 ? 0.6 : -0.6,
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
                className="group w-[280px] flex-none rounded-2xl border border-surface bg-background p-4 shadow-glow-lg sm:w-[320px]"
              >
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0.85 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold mb-2">
                    {cert.issuer}
                  </p>
                  <h4 className={`text-lg font-display font-bold text-text leading-snug ${theme === 'neon' ? 'text-glow' : ''}`}>
                    {cert.title}
                  </h4>
                </motion.div>

                <motion.div
                  className="bg-surface rounded-xl p-2 overflow-hidden"
                  whileHover={{ scale: 0.985 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <motion.img
                    src={getCertificateImage(cert)}
                    alt={`${cert.title} Certificate`}
                    loading="eager"
                    decoding="async"
                    initial={{ scale: 1.04, opacity: 0.82 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="w-full h-auto rounded-md object-contain max-h-[220px] will-change-transform"
                  />
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
