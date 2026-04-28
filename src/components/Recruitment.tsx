import { Cpu, Settings, PenTool, UploadCloud } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useState, useRef } from 'react';

export const Recruitment = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Chassis');
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(formRef.current);
    formData.append('subTeam', selectedTeam);
    
    try {
      const response = await fetch('http://localhost:3005/api/apply', {
        method: 'POST',
        // Fetch API handles the multipart/form-data boundary automatically!
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }
      
      setStatus('success');
      formRef.current.reset();
      setFile(null);
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section id="recruit" className="py-32 px-6 bg-carbon-900 border-t border-white/40">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading subtitle="Join The Drive" title="Recruitment Portal" centered />
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto font-medium">We are looking for passionate, driven engineers to build the next generation of high-performance electric vehicles. Select your division and upload your credentials.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Sub-Team Selection */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-black uppercase tracking-wide mb-8">Select Division</h3>
            
            {[
              { id: 'Chassis', icon: PenTool, desc: 'Carbon-fiber monocoque, composites, and structural optimization.' },
              { id: 'E-Powertrain', icon: Cpu, desc: 'High-voltage battery systems, motors, and power electronics.' },
              { id: 'Vehicle Dynamics', icon: Settings, desc: 'Suspension geometry, steering mapping, and tire modeling.' }
            ].map((team) => (
              <div 
                key={team.id}
                onClick={() => setSelectedTeam(team.id)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                  selectedTeam === team.id 
                    ? 'border-racing-teal bg-racing-teal/10 shadow-[0_0_20px_rgba(0,162,159,0.15)] scale-105' 
                    : 'border-white/40 bg-carbon-800 hover:border-white/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg transition-colors ${selectedTeam === team.id ? 'bg-racing-teal text-white' : 'bg-white/10 text-white/70 group-hover:text-white'}`}>
                    <team.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold font-display uppercase tracking-widest ${selectedTeam === team.id ? 'text-racing-teal' : 'text-white'}`}>{team.id}</h4>
                    <p className="text-xs text-white/70 mt-1 font-medium">{team.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Application Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-7 p-10 bg-carbon-800/80 backdrop-blur-xl border border-white/40 rounded-3xl space-y-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">Full Name</label>
                <input required name="name" type="text" className="w-full bg-carbon-950 border border-white/30 rounded-xl p-4 text-sm font-bold text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" placeholder="Ayrton Senna" />
              </div>
              <div>
                <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">University Email</label>
                <input required name="email" type="email" className="w-full bg-carbon-950 border border-white/30 rounded-xl p-4 text-sm font-bold text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" placeholder="student@university.edu" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">Why do you want to join {selectedTeam}?</label>
              <textarea required name="message" rows={4} className="w-full bg-carbon-950 border border-white/30 rounded-xl p-4 text-sm font-bold text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" placeholder="Tell us about your motorsports passion..." />
            </div>

            <div>
              <label className="block text-[10px] text-white/70 uppercase tracking-widest mb-2 font-bold">Resume / CV (PDF)</label>
              <div className="relative group cursor-pointer">
                <input required name="resume" type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className={`w-full bg-carbon-950 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors duration-300 ${file ? 'border-racing-teal bg-racing-teal/5' : 'border-white/30 group-hover:border-white/30'}`}>
                  <UploadCloud className={`w-8 h-8 mb-3 transition-colors ${file ? 'text-racing-teal' : 'text-white/60 group-hover:text-racing-teal'}`} />
                  <span className={`text-sm font-bold tracking-wide ${file ? 'text-racing-teal' : 'text-white/70'}`}>
                    {file ? file.name : 'Drag & Drop or Click to Upload PDF'}
                  </span>
                </div>
              </div>
            </div>
            
            {status === 'error' && <div className="p-4 bg-racing-red/10 border border-racing-red/50 rounded-xl text-racing-red text-sm font-bold">{errorMessage}</div>}
            {status === 'success' && <div className="p-4 bg-racing-teal/10 border border-racing-teal/50 rounded-xl text-racing-teal text-sm font-bold uppercase tracking-widest">Application transmitted! Welcome to the grid.</div>}
            
            <button disabled={status === 'loading'} type="submit" className="w-full bg-racing-teal text-black py-5 rounded-xl font-black uppercase italic tracking-[0.2em] hover:bg-carbon-950 hover:text-racing-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-wait shadow-[0_0_20px_rgba(0,162,159,0.3)]">
              {status === 'loading' ? 'Uploading Data...' : 'Submit Application'}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};
