import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/lhaase3", label: "GitHub" },
    { icon: FaLinkedin, url: "https://linkedin.com/in/logan-haase-8a15a1280", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-zinc-900 py-16 text-center text-white" id="contact">
      <div className="mx-auto w-full max-w-[1650px] px-8">
        {/* Name */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Logan Haase</h2>

        {/* Carl Sagan Quote */}
        <div className="mb-10 max-w-2xl mx-auto">
          <p className="text-base md:text-lg italic text-zinc-300 leading-relaxed mb-2">
            &ldquo;Somewhere, something incredible is waiting to be known.&rdquo;
          </p>
          <p className="text-sm md:text-base text-zinc-400">— Carl Sagan</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg hover:bg-teal-700 transition-colors duration-300"
                aria-label={link.label}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-zinc-500">
          2025 Logan Haase. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;