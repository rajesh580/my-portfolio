import React from "react";

function Home() {
  const text = "Showcasing my work and skills to the world.";
  return (
    <section id="home" className="py-24">
      <div className="container mx-auto px-4">
        <div className="card p-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Welcome to My Portfolio
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mb-6">I'm Rajesh Rajoli</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            {text}
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#footer" className="px-4 py-2 rounded-md border border-gray-200">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
