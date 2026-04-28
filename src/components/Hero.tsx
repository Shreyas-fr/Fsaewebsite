import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SpeedLines from './SpeedLines';

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <SpeedLines />
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-racing-bg/20 via-racing-bg/60 to-racing-bg z-10" />
        <img 
          src="/hero.png" 
          alt="FSAE Racing Car" 
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-[12rem] font-black font-display leading-none tracking-tighter mb-8 italic uppercase">
            Beyond <br />
            <span className="gradient-text">Limits</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            Engineering the future of high-performance electric racing. Precision, Power, and Passion in every orbit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-racing-teal text-black py-4 px-10 rounded-sm font-black uppercase italic tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 glow-teal group">
              Explore Tech
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="gradient-border py-4 px-10 rounded-sm font-black uppercase italic tracking-widest transition-all duration-500 hover:bg-white/10">
              Team Story
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-80"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Ignite the Engine</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-racing-teal to-transparent" />
      </motion.div>
    </section>
  );
};
