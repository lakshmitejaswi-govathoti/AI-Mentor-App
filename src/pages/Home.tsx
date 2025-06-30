import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Trophy, Users, MessageCircle, Play, Sparkles, Crown } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const Home: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: 'AI-Powered Roadmaps',
      description: 'Get personalized career paths based on your skills and goals with advanced AI analysis.',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-secondary-600" />,
      title: 'Voice & Video Mentors',
      description: 'Interactive AI mentors powered by ElevenLabs and Tavus for immersive guidance.',
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50 to-secondary-100'
    },
    {
      icon: <Shield className="w-8 h-8 text-success-600" />,
      title: 'Blockchain Certifications',
      description: 'Earn verifiable credentials on Algorand blockchain that employers trust.',
      gradient: 'from-success-500 to-success-600',
      bgGradient: 'from-success-50 to-success-100'
    },
    {
      icon: <Trophy className="w-8 h-8 text-accent-600" />,
      title: 'Career Quiz Games',
      description: 'Fun, shareable quizzes integrated with Reddit to discover your career potential.',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100'
    }
  ];

  const stats = [
    { 
      number: '10k+', 
      label: 'Professionals Guided', 
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-primary-500 to-secondary-500'
    },
    { 
      number: '95%', 
      label: 'Success Rate', 
      icon: <Trophy className="w-6 h-6" />,
      gradient: 'from-success-500 to-accent-500'
    },
    { 
      number: '500+', 
      label: 'Career Paths', 
      icon: <Sparkles className="w-6 h-6" />,
      gradient: 'from-secondary-500 to-warning-500'
    }
  ];

  return (
    <>
      {/* Bolt.new Badge - Fixed Position Top Right */}
      <a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        aria-label="Built on Bolt.new"
      >
        <span className="hidden sm:inline">Built on</span>
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-neutral-900 rounded-sm"></div>
        </div>
        <span className="font-bold">Bolt</span>
      </a>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-bounce-subtle border border-primary-200">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Career Transformation</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-gradient-x">
                Career Journey
              </span>
              Starts Here
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Transform your career with personalized roadmaps, AI mentors, and blockchain-verified certifications. 
              Join thousands of professionals already accelerating their success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-gradient-x"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/quiz"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                <span>Try Career Quiz</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-primary-100 hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <div className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200`}>
                      {stat.icon}
                    </div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-gradient-x">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines cutting-edge AI with proven career development strategies 
              to accelerate your professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-neutral-50/50 p-8 rounded-3xl border border-primary-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgGradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-current">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden animate-gradient-x">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M50 50L0 0h100v100z%22 fill=%22white%22 fill-opacity=%220.1%22/%3E%3C/svg%3E')] bg-repeat"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Crown className="w-4 h-4" />
            <span>Join the Career Revolution</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="block">Your Career?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who've accelerated their careers with CareerPath AI. 
            Start your transformation today with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-primary-600 hover:bg-neutral-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Free
            </button>
            <Link
              to="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Home;