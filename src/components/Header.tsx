import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Crown, Sparkles, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isPremium } = useSubscription();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-lg border-b border-primary-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 animate-gradient-xy">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                CareerPath AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link 
                to="/dashboard" 
                className="px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/roadmap" 
                className="px-4 py-2 text-neutral-700 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-all duration-200 font-medium"
              >
                Roadmap
              </Link>
              <Link 
                to="/mentor" 
                className="px-4 py-2 text-neutral-700 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all duration-200 font-medium"
              >
                AI Mentor
              </Link>
              <Link 
                to="/quiz" 
                className="px-4 py-2 text-neutral-700 hover:text-success-600 hover:bg-success-50 rounded-lg transition-all duration-200 font-medium"
              >
                Quiz
              </Link>
              <Link 
                to="/certifications" 
                className="px-4 py-2 text-neutral-700 hover:text-warning-600 hover:bg-warning-50 rounded-lg transition-all duration-200 font-medium"
              >
                Certifications
              </Link>
              <Link 
                to="/reddit" 
                className="px-4 py-2 text-neutral-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium flex items-center space-x-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reddit</span>
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Premium Button */}
              {!isPremium && (
                <Link
                  to="/pricing"
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </Link>
              )}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 bg-primary-50 hover:bg-primary-100 px-3 py-2 rounded-lg transition-all duration-200 border border-primary-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-neutral-700 font-medium">{user.name}</span>
                    {isPremium && <Crown className="w-4 h-4 text-warning-500" />}
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50 animate-slide-up">
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                        <p className="text-xs text-neutral-500">{user.email}</p>
                        {isPremium && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Crown className="w-3 h-3 text-warning-500" />
                            <span className="text-xs text-warning-600 font-medium">Premium Member</span>
                          </div>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      {!isPremium && (
                        <Link
                          to="/pricing"
                          className="flex items-center space-x-3 px-4 py-2 text-secondary-600 hover:bg-secondary-50 transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Crown className="w-4 h-4" />
                          <span>Upgrade to Premium</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Get Started
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 shadow-lg animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/roadmap"
                className="block px-4 py-3 text-neutral-700 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                to="/mentor"
                className="block px-4 py-3 text-neutral-700 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Mentor
              </Link>
              <Link
                to="/quiz"
                className="block px-4 py-3 text-neutral-700 hover:text-success-600 hover:bg-success-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
              <Link
                to="/certifications"
                className="block px-4 py-3 text-neutral-700 hover:text-warning-600 hover:bg-warning-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Certifications
              </Link>
              <Link
                to="/reddit"
                className="flex items-center space-x-2 px-4 py-3 text-neutral-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reddit Community</span>
              </Link>
              {!isPremium && (
                <Link
                  to="/pricing"
                  className="block px-4 py-3 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-lg font-medium text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Upgrade to Premium
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}