import React from "react";

function Home() {
  return (
    <section id="home" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-2xl font-bold text-gray-800 mb-4">I'm Rajesh Rajoli</p>
        <p className="text-lg text-gray-700">
  {"Showcasing my work and skills to the world.".split(", ").map((word, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        opacity: 0,
        animation: `fadeIn 1s forwards`,
        animationDelay: `${index * 1}s`,
      }}
    >
      {word}
      {index < 7 && " " /* Add a space after each word except the last one */}
    </span>
  ))}
</p>

<style>
  {`
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
</style>

      </div>
    </section>
  );
}

export default Home;
