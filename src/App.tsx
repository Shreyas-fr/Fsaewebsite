import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyTrack } from './components/JourneyTrack';
import { Specs } from './components/Specs';
import { Team } from './components/Team';
import { Achievements } from './components/Achievements';
import { Sponsors } from './components/Sponsors';

import { Footer } from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-racing-bg font-body text-white selection:bg-racing-teal selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <JourneyTrack />
      <Specs />
      <Team />
      <Achievements />
      <Sponsors />

      <Footer />
    </div>
  );
};

export default App;
