import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaPython } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';

const skills = [
  { name: "HTML", color: "text-orange-500", icon: <FaHtml5 /> },
  { name: "CSS", color: "text-blue-500", icon: <FaCss3Alt /> },
  { name: "JavaScript", color: "text-yellow-500", icon: <FaJs /> },
  { name: "React", color: "text-blue-400", icon: <FaReact /> },
  { name: "Node.js", color: "text-green-500", icon: <FaNodeJs /> },
  { name: "Git", color: "text-red-500", icon: <FaGit /> },
  { name: "Python", color: "text-teal-500", icon: <FaPython /> },
  { name: "MongoDB", color: "text-green-700", icon: <SiMongodb /> },
];

function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Skills
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                rotate: 3,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl"
            >
              <div className="flex items-center justify-center">
                <div className={`${skill.color} text-5xl`} aria-hidden="true">
                  {skill.icon}
                </div>
              </div>
              <p className="text-lg text-gray-700 mt-4 font-semibold">{skill.name}</p>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color.replace('text-','bg-')} rounded-full`} style={{ width: `${60 + (index * 4)}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
