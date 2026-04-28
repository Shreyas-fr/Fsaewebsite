import { motion } from 'framer-motion';
import { Zap, Gauge, Cpu, Trophy } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const About = () => {
  return (
    <section id="about" className="py-32 px-6 container mx-auto">
      <SectionHeading subtitle="Innovation in Motion" title="The 4 Pillars of Excellence" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: 'Electric Innovation', icon: Zap, desc: 'Pioneering high-voltage battery systems and efficient powertrains.' },
          { title: 'Performance', icon: Gauge, desc: 'Zero to peak velocity with precision-engineered aerodynamics.' },
          { title: 'Learning', icon: Cpu, desc: 'Fostering the next generation of world-class automotive engineers.' },
          { title: 'Competition', icon: Trophy, desc: 'Testing our limits at formula student events worldwide.' }
        ].map((pillar, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 bg-carbon-800/40 backdrop-blur-md border border-white/40 rounded-2xl hover:border-racing-teal transition-colors duration-500"
          >
            <pillar.icon className="w-10 h-10 text-racing-teal mb-6" />
            <h3 className="text-xl font-bold mb-4 font-display">{pillar.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
