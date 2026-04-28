import { SectionHeading } from './SectionHeading';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, TrendingUp, Award } from 'lucide-react';

export const Sponsors = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'benefits'>('partners');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(formRef.current);
    const dataObj = {
      company: formData.get('company'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    try {
      const response = await fetch('http://localhost:3005/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }
      
      setStatus('success');
      formRef.current.reset();
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  const benefits = [
    { icon: Target, title: 'Brand Visibility', desc: 'Your logo prominently displayed on our race car, team apparel, and all digital platforms reaching thousands of students and professionals.' },
    { icon: Users, title: 'Talent Acquisition', desc: 'Direct access to top engineering talent through exclusive networking events and resume access.' },
    { icon: TrendingUp, title: 'B2B Networking', desc: 'Connect with other industry-leading partners at our rollout events and competition days.' },
    { icon: Award, title: 'Tax Deductions', desc: 'As a non-profit student organization, your contributions are fully tax-deductible.' }
  ];

  return (
    <section id="sponsors" className="py-32 px-6 container mx-auto text-center">
      <SectionHeading subtitle="Fueling our Drive" title="Partners & Sponsors" centered />

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-16">
        <button 
          onClick={() => setActiveTab('partners')}
          className={`px-8 py-3 font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 ${activeTab === 'partners' ? 'bg-racing-teal text-black shadow-[0_0_20px_rgba(0,162,159,0.3)]' : 'border border-white/30 text-white/70 hover:border-racing-teal'}`}
        >
          Our Partners
        </button>
        <button 
          onClick={() => setActiveTab('benefits')}
          className={`px-8 py-3 font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 ${activeTab === 'benefits' ? 'bg-racing-teal text-black shadow-[0_0_20px_rgba(0,162,159,0.3)]' : 'border border-white/30 text-white/70 hover:border-racing-teal'}`}
        >
          Sponsor Benefits
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'partners' ? (
          <motion.div 
            key="partners"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-20"
          >
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">Titanium Tier</h4>
              <div className="flex flex-wrap justify-center gap-16">
                {[1, 2].map(i => (
                  <div key={i} className="w-56 h-24 bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-center group hover:border-racing-teal transition-all duration-300 transform hover:-translate-y-2">
                    <span className="text-white/70 font-bold tracking-widest text-sm uppercase group-hover:text-racing-teal transition-colors">Sponsor {i}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">Gold Tier</h4>
              <div className="flex flex-wrap justify-center gap-12">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-40 h-16 bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-sm rounded-xl border border-white/40 flex items-center justify-center group hover:border-racing-teal transition-all duration-300 hover:-translate-y-1">
                    <span className="text-white/70 font-bold tracking-widest text-xs uppercase group-hover:text-white transition-colors">Partner {i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 p-16 gradient-border rounded-3xl relative overflow-hidden text-left sm:text-center">
              <div className="absolute top-0 left-0 w-full h-full bg-racing-teal/10 -z-10" />
              <h3 className="text-3xl md:text-5xl font-black font-display mb-8 uppercase italic">Join the winning circle</h3>
              <p className="text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">Get your brand on the fastest student-built electric car. Partner with us for engineering innovation and global exposure.</p>
              <button 
                onClick={() => setActiveTab('benefits')}
                className="bg-white text-black py-4 px-12 rounded-sm font-black uppercase italic tracking-widest hover:bg-racing-teal transition-all duration-300 transform hover:scale-105"
              >
                Learn About Benefits
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="benefits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-8 bg-carbon-800 border border-white/40 rounded-3xl hover:border-racing-teal transition-colors">
                  <div className="w-12 h-12 bg-racing-teal/10 rounded-xl flex items-center justify-center mb-6 text-racing-teal">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase mb-3">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-10 bg-carbon-800/80 backdrop-blur-xl border border-white/40 rounded-3xl space-y-8 shadow-2xl">
              <h3 className="text-2xl font-display font-black uppercase tracking-wide text-center">Become a Partner Today</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">Company Name</label>
                    <input name="company" required type="text" className="w-full bg-carbon-950 border border-white/30 rounded-xl p-4 text-sm font-bold text-white focus:border-racing-teal outline-none transition-colors" placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">Work Email</label>
                    <input name="email" required type="email" className="w-full bg-carbon-950 border border-white/30 rounded-xl p-4 text-sm font-bold text-white focus:border-racing-teal outline-none transition-colors" placeholder="contact@acmecorp.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">How can we partner?</label>
                  <textarea name="message" required rows={4} className="w-full bg-carbon-950 border border-white/30 rounded-xl p-4 text-sm font-bold text-white focus:border-racing-teal outline-none transition-colors" placeholder="Tell us about your sponsorship goals..." />
                </div>
                
                {status === 'error' && <div className="p-4 bg-racing-red/10 border border-racing-red/50 rounded-xl text-racing-red text-sm font-bold">{errorMessage}</div>}
                {status === 'success' && <div className="p-4 bg-racing-teal/10 border border-racing-teal/50 rounded-xl text-racing-teal text-sm font-bold uppercase tracking-widest">Inquiry transmitted! Let's build the future together.</div>}
                
                <button disabled={status === 'loading'} type="submit" className="w-full bg-racing-teal text-black py-5 rounded-xl font-black uppercase italic tracking-[0.2em] hover:bg-carbon-950 hover:text-racing-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-wait shadow-[0_0_20px_rgba(0,162,159,0.3)]">
                  {status === 'loading' ? 'Transmitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
