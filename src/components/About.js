import React from "react";

function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          About Me
        </h2>
        <div className="flex flex-col lg:flex-row items-center">
          {/* Profile Image */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <img
              src="https://github.com/rajesh580/my-portfolio/blob/main/src/components/profile.jpg"
              alt="Rajesh Rajoli"
              className="rounded-full shadow-lg w-64 mx-auto lg:w-full"
            />
          </div>

          {/* About Text */}
          <div className="lg:w-2/3 lg:pl-10 text-center lg:text-left">
            <p className="text-lg text-gray-700 mb-6">
              Hi, I'm <strong className="text-blue-600">Rajesh Rajoli</strong>, a software developer with a passion for building innovative and efficient web applications. My expertise lies in full-stack development, and I love solving real-world problems through technology.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With a strong commitment to continuous learning, I always look for opportunities to improve my skills and take on challenging projects that push me to grow. I thrive on collaboration and creating impactful solutions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              In my free time, I enjoy exploring new technologies, contributing to open-source projects, and staying updated with the latest industry trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
