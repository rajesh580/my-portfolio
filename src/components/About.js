import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function About() {
  const { theme } = useTheme(); // Get current theme

  return (
    // Use theme-aware colors: bg-surface
    <section id="about" className="bg-surface py-16 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Use theme-aware colors: text-text */}
          <h2 className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-8 sm:mb-12 ${theme === 'neon' ? 'text-glow' : ''}`}>
            About Me
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            {/* Use theme-aware colors: text-text-muted, text-primary */}
            <p className="text-base sm:text-lg text-text-muted mb-4 sm:mb-6">
              Hi, I'm <strong className="text-primary">Rajesh Rajoli</strong>, a
              software developer with a passion for building innovative and
              efficient web applications. My expertise lies in full-stack
              development, and I love solving real-world problems through
              technology.
            </p>
            <p className="text-base sm:text-lg text-text-muted mb-8 sm:mb-12">
              With a strong commitment to continuous learning, I always look for
              opportunities to improve my skills and take on challenging projects
              that push me to grow. I thrive on collaboration and creating
              impactful solutions.
            </p>
          </div>

          {/* 3-column feature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Use theme-aware colors: bg-background, text-primary, text-text, text-text-muted */}
            <div className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg">
              <FaCode className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-display font-semibold text-text mb-2">
                Developer
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                I build responsive, fast, and dynamic web applications using
                modern technologies.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg">
              <FaLightbulb className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-display font-semibold text-text mb-2">
                Problem Solver
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                I enjoy tackling complex challenges and finding clean, efficient
                solutions.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg">
              <FaGraduationCap className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-display font-semibold text-text mb-2">
                Learner
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                I'm a perpetual learner, always exploring new technologies and
                industry trends.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;