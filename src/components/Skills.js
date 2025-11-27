import React from 'react';
import { motion } from 'framer-motion';
// FIX: Import icons from react-icons
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
  FaJava
} from 'react-icons/fa';
import { SiMongodb, SiFlask, SiTailwindcss, SiCplusplus } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

// FIX: Define skills with react-icons components
const skills = [
  { name: 'HTML', color: 'text-orange-500', icon: FaHtml5 },
  { name: 'CSS', color: 'text-blue-500', icon: FaCss3Alt },
  { name: 'JavaScript', color: 'text-yellow-500', icon: FaJsSquare },
  { name: 'React', color: 'text-blue-400', icon: FaReact },
  { name: 'Tailwind CSS', color: 'text-cyan-500', icon: SiTailwindcss },
  { name: 'Node.js', color: 'text-green-500', icon: FaNodeJs },
  { name: 'Python', color: 'text-blue-600', icon: FaPython },
  { name: 'Flask', color: 'text-gray-400', icon: SiFlask }, 
  { name: 'C++', color: 'text-blue-700', icon: SiCplusplus },
  {name: 'java', color: 'text-red-600', icon: FaJava },
  { name: 'MongoDB', color: 'text-green-700', icon: SiMongodb },
  { name: 'Git', color: 'text-red-500', icon: FaGitAlt },
];

function Skills() {
  const { theme } = useTheme(); // Get theme

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // Use theme-aware colors: bg-background
    <section id="skills" className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Use theme-aware colors: text-text */}
        <h2 className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-8 sm:mb-16 ${theme === 'neon' ? 'text-glow' : ''}`}>
          My Skills
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              // Use theme-aware colors: bg-surface
              className="bg-surface rounded-lg shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all"
            >
              {/* FIX: Render the icon as a component */}
              <skill.icon
                className={`${skill.color} text-4xl sm:text-5xl md:text-6xl mx-auto`}
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