import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", color: "text-orange-500", icon: "fab fa-html5" },
  { name: "CSS", color: "text-blue-500", icon: "fab fa-css3-alt" },
  { name: "JavaScript", color: "text-yellow-500", icon: "fab fa-js" },
  { name: "React", color: "text-blue-400", icon: "fab fa-react" },
  { name: "Node.js", color: "text-green-500", icon: "fab fa-node-js" },
  { name: "Git", color: "text-red-500", icon: "fab fa-git" },
  { name: "Python", color: "text-teal-500", icon: "fab fa-python" },
  { name: "MongoDB", color: "text-green-700", icon: "fas fa-database" },
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
              <i
                className={`${skill.icon} ${skill.color} text-6xl`}
                aria-hidden="true"
              ></i>
              <p className="text-lg text-gray-700 mt-4 font-semibold">
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
