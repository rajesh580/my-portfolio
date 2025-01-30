import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <section id="footer" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <div className="flex justify-center space-x-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rajesh-rajoli-9438a3271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-2xl"
          >
            <FaLinkedin />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/rajesh_raj__"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 text-2xl"
          >
            <FaInstagram />
          </a>
          {/* Email */}
          <a
            href="rajeshrajoli772@gmail.com"
            className="text-gray-700 hover:text-gray-900 text-2xl"
          >
            <FaEnvelope />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/rajesh580"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-800 text-2xl"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
