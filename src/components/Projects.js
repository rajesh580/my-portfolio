import React from "react";

function Projects() {
  const projects = [
    {
      title: "Project 1: Chat Application",
      description: "A real-time chat application with user authentication and file sharing features.",
      githubLink: "https://github.com/rajesh580/flask_chatApp",
      liveDemo: "#", // Replace this with the live demo link if available
    },
    {
      title: "Project 2: Face Recognition",
      description: "A face recognition system using python Open-cv",
      githubLink: "https://github.com/rajesh580/face_recognition",
      liveDemo: "#", // Replace this with the live demo link if available
    },
    {
      title: "Project 3: My-Portfolio",
      description: "My personal portfolio website showcasing my skills and projects.",
      githubLink: "https://github.com/rajesh580/face_recognition",
      liveDemo: "https://rajesh580.github.io/my-portfolio/", // Replace this with the live demo link if available
    },
    {
      title: "Project 4: E-commerce platform",
      description: "An e-commerce platform for selling and buying anything",
      githubLink: "https://github.com/rajesh580/E-commerce",
      liveDemo: "#", // Replace this with the live demo link if available
    },
  ];

  return (
    <section id="projects" className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub Repository
                </a>
                {project.liveDemo && project.liveDemo !== "#" && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
