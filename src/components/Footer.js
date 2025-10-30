import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <section id="footer" className="py-12" style={{ background: 'linear-gradient(180deg, #f3e8ff, #ecfeff)' }}>
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <p className="section-sub mb-6">I'm open to new opportunities and collaborations — reach out and say hi!</p>
  <div className="flex justify-center space-x-6 mb-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rajesh-rajoli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/rajesh_raj__"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          {/* Email */}
          <a
            href="mailto:rajeshrajoli722@gmail.com"
            className="text-gray-700 hover:text-gray-900 text-2xl"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/rajesh580"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-800 text-2xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        <div className="max-w-md mx-auto mt-6 card p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            const f = e.target;
            const subject = encodeURIComponent(f.subject.value || 'Portfolio contact');
            const body = encodeURIComponent(`Hi Rajesh,%0D%0A%0D%0A${f.message.value || ''}%0D%0A%0D%0AFrom: ${f.name.value || ''}`);
            window.location.href = `mailto:rajeshrajoli722@gmail.com?subject=${subject}&body=${body}`;
          }}>
            <div className="flex gap-2">
              <input name="name" placeholder="Your name" className="flex-1 px-3 py-2 border rounded" />
              <input name="subject" placeholder="Subject" className="flex-1 px-3 py-2 border rounded" />
            </div>
            <textarea name="message" placeholder="Message" className="w-full mt-2 px-3 py-2 border rounded" rows="4"></textarea>
            <div className="mt-2 text-right">
              <button type="submit" className="btn-accent">Send Email</button>
            </div>
          </form>
        </div>

        <div className="text-sm text-gray-600 mt-4">© {new Date().getFullYear()} Rajesh Rajoli — Built with React</div>
      </div>
    </section>
  );
}

export default Footer;
