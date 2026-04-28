import { SectionHeading } from './SectionHeading';

export const Achievements = () => {
  return (
    <section id="achievements" className="py-32 px-6 bg-racing-teal/5 border-y border-racing-teal/10">
      <div className="container mx-auto">
        <SectionHeading subtitle="Track Record" title="Glory Days" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { year: '2023', event: 'Formula Student Germany', result: '3rd Place Overall', detail: 'Best Electric Design Award' },
            { year: '2022', event: 'Formula Student UK', result: 'Winner: Acceleration', detail: 'New Track Record set' },
            { year: '2021', event: 'Formula Student Italy', result: '1st in Business Plan', detail: 'Top scores in static events' }
          ].map((ach, i) => (
            <div key={i} className="p-10 border border-white/40 rounded-3xl bg-racing-bg/50 backdrop-blur-xl group hover:border-racing-teal transition-colors shadow-2xl">
              <div className="text-racing-teal font-black text-4xl mb-6">{ach.year}</div>
              <h3 className="text-xl font-bold mb-2 font-display">{ach.event}</h3>
              <p className="text-white font-medium mb-4">{ach.result}</p>
              <div className="h-[1px] w-12 bg-white/20 mb-4 group-hover:w-full transition-all duration-700" />
              <p className="text-white/70 text-sm italic">{ach.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
