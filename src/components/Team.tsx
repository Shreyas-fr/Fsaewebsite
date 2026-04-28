import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const Team = () => {
  return (
    <section id="team" className="py-32 px-6 container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <SectionHeading subtitle="The Minds Behind" title="Our Crew" />
        <button className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-racing-teal transition-colors mb-12">
          View All Members <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { role: 'Team Lead', name: 'Alex Thompson' },
          { role: 'Mechanical head', name: 'Sarah Chen' },
          { role: 'Electronics Lead', name: 'Marco Rossi' },
          { role: 'Aerodynamics', name: 'Elena Vance' }
        ].map((member, i) => (
          <motion.div key={i} className="group">
            <div className="aspect-[3/4] bg-carbon-800/80 rounded-2xl mb-6 overflow-hidden relative shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-racing-bg to-transparent opacity-80 z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity">
                 <span className="text-white font-display font-black text-[8rem] uppercase mix-blend-overlay">{member.name.charAt(0)}</span>
              </div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="flex gap-4">
                  <FaLinkedin className="w-5 h-5 hover:text-racing-teal cursor-pointer" />
                  <FaTwitter className="w-5 h-5 hover:text-racing-teal cursor-pointer" />
                </div>
              </div>
            </div>
            <h4 className="text-lg font-bold font-display uppercase tracking-tight">{member.name}</h4>
            <p className="text-xs uppercase tracking-widest text-racing-teal font-bold">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
