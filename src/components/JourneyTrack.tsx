import { motion, useScroll, useTransform, useSpring, MotionValue, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeading } from './SectionHeading';
import { Flag, Rocket, Cpu, Award } from 'lucide-react';

const TRACK_PATH = `M 450 850 L 750 850 C 850 850, 950 750, 850 650 L 650 550 C 600 520, 600 450, 650 420 L 900 350 C 980 320, 950 200, 850 180 L 300 100 C 150 80, 50 180, 100 280 C 150 380, 300 300, 350 380 L 550 580 C 600 630, 550 700, 450 700 L 300 700 C 180 700, 150 800, 250 850 L 450 850 Z`;

const milestones = [
  { year: '2020', title: 'Conception', top: '80%', left: '75%', align: 'text-left', delay: 0.1, icon: Flag, desc: 'The dream begins in the university labs.' },
  { year: '2022', title: 'First Chassis', top: '35%', left: '85%', align: 'text-right', delay: 0.3, icon: Rocket, desc: 'Carbon-fiber tub hits the track.' },
  { year: '2024', title: 'Transition to EV', top: '25%', left: '25%', align: 'text-left', delay: 0.6, icon: Cpu, desc: 'Fully electric powertrain realized.' },
  { year: '2026', title: 'Championship', top: '65%', left: '25%', align: 'text-right', delay: 0.9, icon: Award, desc: 'Top tier international standings.' },
];

const MilestoneCard = ({ ms, progress }: { ms: typeof milestones[0], progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [ms.delay - 0.1, ms.delay], [0, 1]);
  const y = useTransform(progress, [ms.delay - 0.1, ms.delay], [20, 0]);

  return (
    <motion.div
      className={`absolute w-44 md:w-64 z-50 transform -translate-x-1/2 -translate-y-1/2 ${ms.align}`}
      style={{ top: ms.top, left: ms.left, opacity, y }}
    >
      <div className="bg-carbon-800/90 backdrop-blur-xl border border-white/30 rounded-2xl p-5 shadow-2xl hover:border-racing-teal hover:shadow-[0_0_30px_rgba(0,255,170,0.2)] transition-all">
        <ms.icon className="w-6 h-6 text-racing-teal mb-3" />
        <div className="text-racing-teal font-black text-2xl mb-1">{ms.year}</div>
        <div className="text-white font-bold tracking-widest text-xs md:text-sm uppercase mb-2">{ms.title}</div>
        <div className="text-white/70 text-[10px] md:text-xs leading-relaxed">{ms.desc}</div>
      </div>
    </motion.div>
  );
};

export const JourneyTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  useAnimationFrame(() => {
    if (!pathRef.current || !carRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    
    let scrollVal = smoothProgress.get();
    if (scrollVal > 1) scrollVal = 1;
    if (scrollVal < 0) scrollVal = 0;

    const point = path.getPointAtLength(length * scrollVal);
    
    const dl = 1; // 1 unit ahead for angular calculation
    let nextPoint;
    let angle;
    
    if (length * scrollVal + dl > length) {
      nextPoint = path.getPointAtLength(length * scrollVal - dl);
      angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI) + 180;
    } else {
      nextPoint = path.getPointAtLength(length * scrollVal + dl);
      angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
    }

    carRef.current.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle + 90})`);
  });

  return (
    <section id="journey" ref={containerRef} className="relative h-[250vh] bg-carbon-900 border-y border-white/40 mx-auto">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-12 md:top-24 w-full z-50 px-6">
          <SectionHeading subtitle="Timeline" title="Track Journey" centered />
        </div>

        <div className="relative w-full max-w-5xl aspect-[4/3] mt-20 md:mt-0">
          {/* Base Track SVG */}
          <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full z-10 scale-[1.2] md:scale-100 overflow-visible">
            
            {/* Background Track Outlines */}
            <path d={TRACK_PATH} fill="none" stroke="#222" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
            <path ref={pathRef} d={TRACK_PATH} fill="none" stroke="#2a2a2a" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
            
            {/* Dashed Centerline */}
            <path d={TRACK_PATH} fill="none" stroke="#444" strokeWidth="2" strokeDasharray="15 20" strokeLinecap="round" className="opacity-60" />
            
            {/* Glowing Neon Track Progress */}
            <motion.path 
              d={TRACK_PATH} 
              fill="none" 
              stroke="#00a29f" 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: smoothProgress }}
              className="drop-shadow-[0_0_15px_#00a29f]"
            />
            
            {/* Start/Finish Line Indicator */}
            <line x1="450" y1="820" x2="450" y2="880" stroke="#111" strokeWidth="6" strokeDasharray="6 6" />

            {/* FSAE Car Perfectly Tracing The Path */}
            <g ref={carRef} className="text-white drop-shadow-[0_0_10px_#00a29f] transition-transform duration-75">
              <svg x="-30" y="-60" width="60" height="120" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Front Wing */}
                <rect x="10" y="15" width="80" height="15" fill="currentColor" rx="4" />
                <rect x="45" y="30" width="10" height="15" fill="currentColor" />
                
                {/* Front Tires */}
                <rect x="0" y="35" width="20" height="40" fill="#111" rx="4" />
                <rect x="80" y="35" width="20" height="40" fill="#111" rx="4" />
                
                {/* Chassis / Nose */}
                <path d="M 40,45 L 60,45 L 65,140 L 35,140 Z" fill="currentColor" />
                
                {/* Driver Helmet */}
                <circle cx="50" cy="90" r="10" fill="#00a29f" /> 
                
                {/* Rear Tires */}
                <rect x="0" y="130" width="20" height="45" fill="#111" rx="4" />
                <rect x="80" y="130" width="20" height="45" fill="#111" rx="4" />
                
                {/* Rear Wing Support & Wing */}
                <rect x="45" y="140" width="10" height="35" fill="currentColor" />
                <rect x="15" y="175" width="70" height="20" fill="currentColor" rx="4" />
                
                {/* Central Glowing Accent */}
                <rect x="48" y="110" width="4" height="20" fill="#00a29f" />
              </svg>
            </g>
          </svg>

          {/* Interactive Pop-up Milestones */}
          <div className="absolute inset-0 z-50 pointer-events-none scale-[1.2] md:scale-100">
            {milestones.map((ms, index) => (
              <MilestoneCard key={index} ms={ms} progress={smoothProgress} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
