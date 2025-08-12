import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="relative bg-black backdrop-blur-md border-t border-teal-500/20">
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse"></div>
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 items-center text-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src="/assets/images/logo.png" width="160" alt="Logo" />
          </div>

          {/* Center Text */}
          <div>
            <p className="text-gray-300 text-lg font-medium tracking-wide">
              Powered by{' '}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
                Quantic Solutions
              </span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end flex-wrap gap-3 mt-4 md:mt-0">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative p-3 rounded-xl bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 border border-gray-700/50 hover:border-teal-400/50 transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-300 to-green-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                  <IconComponent
                    size={20}
                    className="text-white group-hover:text-white transition-colors duration-300 relative z-10"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom border and pulses */}
        <div className="mt-8 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-75"></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
