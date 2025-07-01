import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getContent } from '@/lib/contentManager';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) {
    return null; 
  }

  const { company } = content;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Projetos Inc.O', href: '/projetos' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/982c6fef-1f53-4e61-a4d0-222934ecedca/62974c997b4a774cd83a8242365d2373.png"
              alt={company.name} 
              className="h-20 w-auto"
            />
          </Link>

          
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#283449] ${
                  location.pathname === item.href
                    ? 'text-[#283449] border-b-2 border-[#283449]'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-[#283449]'
                } ${!isScrolled && location.pathname !== item.href ? 'text-[#283449]' : 'text-[#283449]'}`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              asChild
              className="bg-[#283449] hover:bg-[#75819f] text-white"
            >
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>

          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isScrolled ? 'text-gray-700' : 'text-white'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-[#283449] bg-gray-50'
                        : 'text-gray-700 hover:text-[#283449] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Button 
                    asChild
                    className="bg-[#283449] hover:bg-[#75819f] text-white"
                  >
                    <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                      Fale Conosco
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;