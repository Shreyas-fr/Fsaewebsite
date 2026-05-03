import { Mail } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { SectionHeading } from './SectionHeading';
import { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Smooth reset after success
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-carbon-900">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <SectionHeading subtitle="Get in Touch" title="Connect With Us" />
          <p className="text-white/70 mb-12 leading-relaxed max-w-md">Whether you are a potential partner, a student looking to join, or just a racing fan, we want to hear from you.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-racing-teal group-hover:text-black transition-colors">
                <Mail className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30">Email Us</p>
                <p className="text-lg font-bold text-white">race@fsaeteam.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-racing-teal group-hover:text-black transition-colors">
                <FaInstagram className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30">Instagram</p>
                <p className="text-lg font-bold text-white">@fsaeteam_racing</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-12 bg-racing-bg border border-white/40 rounded-3xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <input required type="text" placeholder="NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/10 border border-white/30 rounded-sm p-4 text-xs font-bold tracking-widest text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" />
            <input required type="email" placeholder="EMAIL" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/10 border border-white/30 rounded-sm p-4 text-xs font-bold tracking-widest text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" />
          </div>
          <input required type="text" placeholder="SUBJECT" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-white/10 border border-white/30 rounded-sm p-4 text-xs font-bold tracking-widest text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" />
          <textarea required placeholder="MESSAGE" rows={6} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/10 border border-white/30 rounded-sm p-4 text-xs font-bold tracking-widest text-white focus:border-racing-teal outline-none transition-colors placeholder:text-white/60" />
          
          {status === 'error' && <p className="text-racing-red text-sm font-bold uppercase tracking-wide">{errorMessage}</p>}
          {status === 'success' && <p className="text-racing-teal text-sm font-bold uppercase tracking-wide">Message deployed to the grid! Thanks.</p>}
          
          <button disabled={status === 'loading'} type="submit" className="w-full bg-racing-teal text-black py-4 rounded-sm font-black uppercase italic tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-wait">
            {status === 'loading' ? 'Transmitting Data...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};
