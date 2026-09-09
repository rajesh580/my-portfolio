import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLightbulb, FaDownload } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../utils/animations';
import { handleResumeDownload, RESUME_URL, RESUME_FILENAME } from '../../utils/downloadResume';
import SectionMotionObjects from '../layout/SectionMotionObjects';

function About() {
  const { theme } = useTheme(); // Get current theme

  return (
    // Use theme-aware colors: bg-surface
    <section id="about" className="relative overflow-hidden bg-surface/45 py-16 md:py-28">
      <SectionMotionObjects variant="about" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Use theme-aware colors: text-text */}
          <motion.h2 variants={fadeUp} className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-8 sm:mb-12 ${theme === 'neon' ? 'text-glow' : ''}`}>
            About Me
          </motion.h2>
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center">
            {/* Use theme-aware colors: text-text-muted, text-primary */}
            <p className="text-base sm:text-lg text-text-muted mb-4 sm:mb-6">
              Hi, I'm <strong className="text-primary">Rajesh Rajoli</strong>, a
              software engineer specializing in full-stack web development, REST APIs,
              machine learning, and AI-powered applications. I build scalable, data-driven
              solutions that solve real-world problems.
            </p>
            <p className="text-base sm:text-lg text-text-muted mb-6 sm:mb-8">
              With experience spanning production web platforms, predictive machine learning models,
              and responsive modern interfaces, I focus on delivering clean code, reliable backend architectures,
              and engaging user experiences.
            </p>

            <motion.div variants={fadeUp} className="mb-8 flex justify-center">
              <motion.a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeDownload}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-primary-accent transition duration-200 cursor-pointer"
              >
                <FaDownload /> Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              variants={scaleIn}
              whileHover={{ y: -2 }}
              className="rounded-xl bg-background p-4 md:p-6 shadow-md border border-surface mb-8"
            >
              <h3 className="text-xl font-display font-bold text-text mb-3">Core Strengths</h3>
              <div className="space-y-3">
                {[
                  { name: 'React / Frontend Development', value: 90 },
                  { name: 'Node.js / Python Backend & REST APIs', value: 88 },
                  { name: 'Machine Learning & AI Solutions', value: 84 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm text-text-muted mb-1">
                      <span>{item.name}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className="h-2 bg-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 3-column feature */}
          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Use theme-aware colors: bg-background, text-primary, text-text, text-text-muted */}
            <motion.div variants={scaleIn} whileHover={{ y: -3 }} className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg">
              <FaCode className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-display font-semibold text-text mb-2">
                Developer
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                I build responsive, fast, and dynamic web applications using
                modern technologies.
              </p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ y: -3 }} className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg">
              <FaLightbulb className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-display font-semibold text-text mb-2">
                Problem Solver
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                I enjoy tackling complex challenges and finding clean, efficient
                solutions.
              </p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ y: -3 }} className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg">
              <FaGraduationCap className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-display font-semibold text-text mb-2">
                Learner
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                I'm a perpetual learner, always exploring new technologies and
                industry trends.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
