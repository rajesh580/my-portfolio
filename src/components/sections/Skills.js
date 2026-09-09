import React from 'react';
import { motion } from 'framer-motion';
// FIX: Import icons from react-icons
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
} from 'react-icons/fa';
import { SiMongodb, SiFlask, SiTailwindcss, SiMysql, SiFastapi, SiScikitlearn, SiExpress } from 'react-icons/si';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../utils/animations';
import SectionMotionObjects from '../layout/SectionMotionObjects';

// FIX: Define skills with react-icons components matching resume
const skills = [
  { name: 'React.js', color: 'text-blue-400', icon: FaReact },
  { name: 'JavaScript', color: 'text-yellow-500', icon: FaJsSquare },
  { name: 'Node.js', color: 'text-green-500', icon: FaNodeJs },
  { name: 'Express.js', color: 'text-gray-300', icon: SiExpress },
  { name: 'Python', color: 'text-blue-500', icon: FaPython },
  { name: 'FastAPI', color: 'text-teal-500', icon: SiFastapi },
  { name: 'Flask', color: 'text-gray-400', icon: SiFlask },
  { name: 'Scikit-learn / ML', color: 'text-orange-500', icon: SiScikitlearn },
  { name: 'MySQL', color: 'text-blue-600', icon: SiMysql },
  { name: 'MongoDB', color: 'text-green-600', icon: SiMongodb },
  { name: 'Tailwind CSS', color: 'text-cyan-400', icon: SiTailwindcss },
  { name: 'Git & GitHub', color: 'text-red-500', icon: FaGitAlt },
];

function Skills() {
  const { theme } = useTheme(); // Get theme

  return (
    // Use theme-aware colors: bg-background
    <section id="skills" className="relative overflow-hidden py-16 md:py-28 bg-background/35">
      <SectionMotionObjects variant="skills" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Use theme-aware colors: text-text */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-4 sm:mb-6 ${theme === 'neon' ? 'text-glow' : ''}`}
        >
          My Skills
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center text-sm sm:text-base text-text-muted max-w-2xl mx-auto mb-8"
        >
          I work with a wide range of technologies, from frontend frameworks to backend services and cloud workflows.
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{
                y: -3,
                transition: { duration: 0.16 },
              }}
              whileTap={{ scale: 0.98 }}
              // Use theme-aware colors: bg-surface
              className="group bg-surface rounded-lg shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all"
            >
              {/* FIX: Render the icon as a component */}
              <skill.icon
                className={`${skill.color} text-4xl sm:text-5xl md:text-6xl mx-auto transition-transform duration-200 group-hover:-translate-y-1`}
                aria-hidden="true"
              />
              {/* Use theme-aware colors: text-text */}
              <p className="text-sm sm:text-base md:text-lg text-text mt-2 sm:mt-4 font-semibold">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
