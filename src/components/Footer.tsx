import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/40 bg-carbon-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 opacity-50" />
          <span className="font-display font-black text-xl italic tracking-tighter opacity-50">FSAE <span className="gradient-text">RACING</span></span>
        </div>
        
        <div className="flex gap-8">
          <FaTwitter className="w-5 h-5 opacity-30 hover:opacity-100 hover:text-racing-teal cursor-pointer transition-opacity" />
          <FaInstagram className="w-5 h-5 opacity-30 hover:opacity-100 hover:text-racing-teal cursor-pointer transition-opacity" />
          <FaLinkedin className="w-5 h-5 opacity-30 hover:opacity-100 hover:text-racing-teal cursor-pointer transition-opacity" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">© 2026 FSAE Racing Team. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
