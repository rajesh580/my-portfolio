import React from "react";

function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          About Me
        </h2>

        {/* Text-only layout (profile picture removed) */}
        <div className="card max-w-3xl mx-auto text-center p-8">
          <p className="text-lg text-gray-700 mb-6">
            Hi, I'm <strong className="text-indigo-600">Rajesh Rajoli</strong>, a software developer passionate about building innovative and efficient web applications. My expertise is full-stack development and I enjoy solving real-world problems through code.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            I'm committed to continuous learning, collaboration, and creating impactful solutions. I contribute to open-source projects and keep up with the latest tech trends.
          </p>

          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">Core skills</div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">React</span>
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700">Node.js</span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700">JavaScript</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
