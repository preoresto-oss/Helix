import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  { title: 'Daily logs not getting done properly', desc: 'Superintendents are busy running the job. Logs become an afterthought—or get filled out days later from memory.' },
  { title: 'Invoices sitting too long', desc: 'Invoices come in, get stacked, and wait for someone to have time. Cash flow suffers.' },
  { title: 'Sub insurance tracked manually', desc: 'COIs get checked at onboarding, then forgotten. Expirations slip through. Risk goes unmanaged.' },
  { title: 'Project data scattered everywhere', desc: 'Some in Procore. Some in Excel. Some in email. Someone always has to chase the full picture.' },
  { title: 'PMs buried in admin', desc: 'Your project managers should be managing projects. Instead, they spend hours on reporting and follow-ups.' },
  { title: 'Constant chasing for updates', desc: 'Every day is a chain of reminders and status checks for information that should be automatic.' },
];

export default function RealitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      const cards = section.querySelectorAll('.pain-card');
      gsap.fromTo(cards, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="relative bg-helix-bg py-16 lg:py-20" style={{ zIndex: 16 }}>
      <div className="w-full px-[6vw]">
        <div ref={headingRef} className="text-center mb-10 will-change-transform">
          <div className="orange-rule mx-auto mb-5" />
          <h2 className="font-heading font-bold text-helix-text mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            What we see in the field
          </h2>
          <p className="text-helix-muted max-w-xl mx-auto" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            This is what operations actually look like. It is not a talent problem. It is a systems problem.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {painPoints.map((point, i) => (
            <div key={i} className="pain-card rounded-xl border border-helix-text/10 bg-helix-bg/50 p-5 will-change-transform">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-helix-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#5B8DEF" strokeWidth="1.2" /><circle cx="7" cy="7" r="2" fill="#FF4D2E" /></svg>
                </div>
                <h3 className="font-heading font-semibold text-helix-text text-sm leading-snug">{point.title}</h3>
              </div>
              <p className="text-helix-muted text-sm leading-relaxed pl-9">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
