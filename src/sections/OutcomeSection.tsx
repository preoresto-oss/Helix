import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const outcomes = [
  {
    title: 'Less manual work',
    description: 'Repetitive tasks that currently take hours are handled automatically. Your team gets that time back.',
  },
  {
    title: 'More output from the same team',
    description: 'Same people. Same hours. Significantly more work completed—because the friction is gone.',
  },
  {
    title: 'Better visibility',
    description: 'Information that was scattered across email, texts, and spreadsheets becomes centralized and accessible.',
  },
  {
    title: 'Fewer missed details',
    description: 'Deadlines, expirations, follow-ups, and handoffs happen automatically. Nothing falls through the cracks.',
  },
  {
    title: 'Cleaner operations',
    description: 'Processes that were ad-hoc become systematic. Reporting that was reactive becomes real-time.',
  },
];

export default function OutcomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      const items = section.querySelectorAll('.outcome-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: itemsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-helix-bg py-[12vh]"
      style={{ zIndex: 19 }}
    >
      <div className="w-full px-[7vw]">
        <div ref={headingRef} className="text-center mb-14 will-change-transform">
          <div className="orange-rule mx-auto mb-6" />
          <h2
            className="font-heading font-bold text-helix-text mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            The real outcome
          </h2>
          <p
            className="text-helix-muted max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6 }}
          >
            No hype. No exaggeration. This is what actually happens when the 
            repetitive work gets handled automatically.
          </p>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {outcomes.map((item, i) => (
            <div
              key={i}
              className={`outcome-item rounded-xl border border-helix-text/10 bg-helix-bg/50 backdrop-blur-sm p-6 will-change-transform ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-helix-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-5" stroke="#FF4D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-helix-text text-base">{item.title}</h3>
              </div>
              <p className="text-helix-muted text-sm leading-relaxed pl-11">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
