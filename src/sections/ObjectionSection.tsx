import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const notItems = [
  'Replacing your team with automation',
  'Forcing you to adopt new systems',
  'Overhauling your business model',
  'Adding complexity to your operations',
  'Requiring months of implementation',
  'Charging unpredictable fees',
];

const isItems = [
  'Removing repetitive, low-value work',
  'Improving clarity across your operations',
  'Increasing productivity of your existing people',
  'Working with the tools you already use',
  'Delivering clear scope and flat pricing',
  'Showing measurable results within weeks',
];

export default function ObjectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      const notEls = section.querySelectorAll('.not-item');
      const isEls = section.querySelectorAll('.is-item');

      gsap.fromTo(
        notEls,
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        isEls,
        { opacity: 0, x: 12 },
        {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-helix-bg py-16 lg:py-20"
      style={{ zIndex: 21 }}
    >
      <div className="w-full px-[6vw]">
        <div ref={contentRef} className="max-w-4xl mx-auto will-change-transform">
          {/* Section Label */}
          <span className="micro-label block mb-6 text-center">CLEAR EXPECTATIONS</span>

          {/* Headline */}
          <h2
            className="font-heading font-bold text-helix-text text-center mb-12"
            style={{ fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            What this is—and what it isn&apos;t
          </h2>

          {/* Two Column: NOT / IS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NOT Column */}
            <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-6">
              <h3 className="font-heading font-semibold text-red-400 text-lg mb-5 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                This is NOT
              </h3>
              <ul className="space-y-3">
                {notItems.map((item, i) => (
                  <li key={i} className="not-item flex items-start gap-3 text-helix-muted text-sm will-change-transform">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M4 4l6 6M10 4l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* IS Column */}
            <div className="rounded-xl border border-helix-accent/10 bg-helix-accent/5 p-6">
              <h3 className="font-heading font-semibold text-helix-accent text-lg mb-5 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                This IS
              </h3>
              <ul className="space-y-3">
                {isItems.map((item, i) => (
                  <li key={i} className="is-item flex items-start gap-3 text-helix-text/85 text-sm will-change-transform">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M3 7l3 3 5-5" stroke="#5B8DEF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom statement */}
          <div className="mt-10 text-center">
            <p className="text-helix-muted text-sm max-w-xl mx-auto">
              This isn&apos;t about doing something new. 
              It&apos;s about fixing the things that have always slowed your business down.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
