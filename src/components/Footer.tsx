import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Sparkles, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg animate-gradient-xy">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                CareerPath AI
              </span>
            </div>
            <p className="text-neutral-300 mb-6 max-w-md leading-relaxed">
              Empowering professionals with AI-driven career guidance, personalized roadmaps, and blockchain-verified certifications. 
              Transform your career journey with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-primary-500/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              >
                <Twitter className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-secondary-500/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              >
                <Linkedin className="w-5 h-5 group-hover:text-secondary-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent-500/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              >
                <Github className="w-5 h-5 group-hover:text-accent-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>Dashboard</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all duration-200"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/roadmap" 
                  className="text-neutral-300 hover:text-secondary-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>Career Roadmap</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-secondary-400 transition-all duration-200"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/mentor" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>AI Mentor</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-accent-400 transition-all duration-200"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/certifications" 
                  className="text-neutral-300 hover:text-success-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>Certifications</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-success-400 transition-all duration-200"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-warning-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>About</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-warning-400 transition-all duration-200"></div>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>Privacy Policy</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all duration-200"></div>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-secondary-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>Terms of Service</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-secondary-400 transition-all duration-200"></div>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span>Contact</span>
                  <div className="w-0 group-hover:w-2 h-0.5 bg-accent-400 transition-all duration-200"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-2 text-neutral-400 text-sm">
            <span>© 2025 CareerPath AI. Made with</span>
            <Heart className="w-4 h-4 text-error-400 animate-pulse" />
            <span>for career growth</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-neutral-400 hover:text-primary-400 transition-colors text-sm group"
            >
              <span>Built on Bolt</span>
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;