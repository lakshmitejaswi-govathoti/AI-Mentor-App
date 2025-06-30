import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50/30">
      <Header />
      <main className={`${isHomePage ? '' : 'pt-8'} min-h-screen`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;