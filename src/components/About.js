import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

function About() {
  const { theme } = useTheme(); // Get current theme
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay to ensure components are ready for animation.
    // In a real app, you might wait for data fetching or other async operations.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // A short delay

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <FaCode className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />,
      title: 'Developer',
      description: 'I build responsive, fast, and dynamic web applications using modern technologies.',
    },
    {
      icon: <FaLightbulb className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />,
      title: 'Problem Solver',
      description: 'I enjoy tackling complex challenges and finding clean, efficient solutions.',
    },
    {
      icon: <FaGraduationCap className="text-4xl sm:text-5xl text-primary mx-auto mb-3 sm:mb-4" />,
      title: 'Learner',
      description: "I'm a perpetual learner, always exploring new technologies and industry trends.",
    },
  ];

  return (
    // Use theme-aware colors: bg-surface
    <section id="about" className="bg-surface py-16 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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

            <div className="rounded-xl bg-background p-4 md:p-6 shadow-md border border-surface mb-8">
              <h3 className="text-xl font-display font-bold text-text mb-3">Core Strengths</h3>
              <div className="space-y-3">
                {[
                  { name: 'React / Frontend', value: 90, delay: 0.1 },
                  { name: 'Python / Backend', value: 85, delay: 0.2 },
                  { name: 'Data Analysis', value: 80, delay: 0.3 },
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between text-sm text-text-muted mb-1">
                      <span>{item.name}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className="h-2 bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={!isLoading ? { width: `${item.value}%` } : { width: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: item.delay }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 3-column feature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-4 sm:p-6 bg-background rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 200 }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-text mt-2 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;