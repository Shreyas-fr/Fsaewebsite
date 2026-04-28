import { Gauge, Zap, ZapOff, Wind, MousePointer2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const Specs = () => {
  return (
    <section id="specs" className="py-32 px-6 bg-carbon-900/50">
      <div className="container mx-auto">
        <SectionHeading subtitle="Technical Precision" title="The Specs" centered />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/40 rounded-3xl overflow-hidden">
          {[
            { label: 'Top Speed', value: '120 KM/H', icon: Gauge },
            { label: 'Acceleration', value: '0-100 IN 3.2s', icon: Zap },
            { label: 'Battery Capacity', value: '7.5 kWh', icon: ZapOff },
            { label: 'Max Torque', value: '120 Nm', icon: Wind },
            { label: 'Weight', value: '310KG', icon: MousePointer2 },
            { label: 'Downforce', value: '1100 N', icon: Wind },
            { label: 'Cell Voltage', value: '400V', icon: Zap },
            { label: 'Tires', value: 'Hoosier R25B', icon: Gauge }
          ].map((spec, i) => (
            <div key={i} className="p-12 bg-racing-bg text-center group hover:bg-carbon-800 transition-colors">
              <spec.icon className="w-6 h-6 mx-auto mb-6 text-white/60 group-hover:text-racing-teal transition-colors" />
              <div className="text-3xl font-black font-display mb-2">{spec.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/70">{spec.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
