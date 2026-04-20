import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ShiftSection() {
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

      const items = section.querySelectorAll('.shift-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-helix-bg py-[12vh]"
      style={{ zIndex: 17 }}
    >
      <div className="w-full px-[7vw]">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center will-change-transform">
          {/* Section Label */}
          <span className="micro-label block mb-6">THE SHIFT</span>

          {/* Headline */}
          <h2
            className="font-heading font-bold text-helix-text mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            All of this work still needs to happen.
            <br />
            <span className="text-helix-accent">The difference is—it no longer needs to be done manually.</span>
          </h2>

          <p
            className="text-helix-muted mb-10 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6 }}
          >
            Helix AI builds systems inside your existing operations. We do not replace 
            systems unnecessarily. We do not replace people. We remove the manual, 
            repetitive work that should not require human attention.
          </p>

          {/* Three pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Systems stay', desc: 'You keep the tools and processes that already work. We connect to them, not replace them.' },
              { title: 'People stay', desc: 'Your team does what they do best. The repetitive, low-value work gets handled automatically.' },
              { title: 'Output increases', desc: 'Same team. Same hours. Significantly more work gets done—and done correctly.' },
            ].map((item, i) => (
              <div key={i} className="shift-item text-left rounded-lg border border-helix-text/10 bg-helix-bg/50 p-5 will-change-transform">
                <h3 className="font-heading font-semibold text-helix-text text-base mb-2">{item.title}</h3>
                <p className="text-helix-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
