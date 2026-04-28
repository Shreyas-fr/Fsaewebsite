import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Specs', href: '#specs' },
    { name: 'Team', href: '#team' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Sponsors', href: '#sponsors' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-racing-bg/80 backdrop-blur-xl border-b border-white/30 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="FSAE Logo" className="w-10 h-10 object-contain" />
          <span className="font-display font-black text-2xl tracking-tighter italic">
            FSAE <span className="gradient-text">RACING</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-racing-teal transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden sm:block bg-racing-teal text-black px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all duration-300 transform active:scale-95 glow-teal">
            Sponsor Us
          </button>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-carbon-900 border-b border-white/30"
          >
            <div className="flex flex-col p-6 gap-4 text-[10px] font-bold tracking-[0.2em] uppercase">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-racing-teal transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { setIsMobileMenuOpen(false); document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-racing-teal text-black px-6 py-3 rounded-md font-bold text-center mt-4">
                SPONSOR US
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
