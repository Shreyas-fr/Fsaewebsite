export const SectionHeading = ({ subtitle, title, centered = false }: { subtitle: string, title: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <span className="text-racing-teal font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">
      {subtitle}
    </span>
    <h2 className="text-4xl md:text-6xl font-black font-display italic leading-none uppercase">
      {title}
    </h2>
  </div>
);
