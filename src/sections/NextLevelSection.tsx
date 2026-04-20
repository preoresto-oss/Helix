import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const shifts = [
  {
    before: 'Decisions based on gut feel',
    after: 'Decisions based on clear data',
  },
  {
    before: 'Bottlenecks hidden by busy work',
    after: 'Bottlenecks visible and addressable',
  },
  {
    before: 'Performance understood anecdotally',
    after: 'Performance measured objectively',
  },
  {
    before: 'Growth limited by operational capacity',
    after: 'Growth becomes intentional and scalable',
  },
];

export default function NextLevelSection() {
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

      const items = section.querySelectorAll('.shift-row');
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-helix-bg py-[12vh]"
      style={{ zIndex: 20 }}
    >
      <div className="w-full px-[7vw]">
        <div ref={contentRef} className="max-w-4xl mx-auto will-change-transform">
          {/* Section Label */}
          <span className="micro-label block mb-6 text-center">WHAT HAPPENS NEXT</span>

          {/* Headline */}
          <h2
            className="font-heading font-bold text-helix-text text-center mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            When operations become more efficient, owners gain clarity
          </h2>

          <p
            className="text-helix-muted text-center mb-12 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6 }}
          >
            This is not about transformation or disruption. It is about removing enough 
            friction that you can finally see your business clearly—and make decisions 
            with confidence.
          </p>

          {/* Before/After Grid */}
          <div className="space-y-4 mb-12">
            {shifts.map((item, i) => (
              <div
                key={i}
                className="shift-row grid grid-cols-1 sm:grid-cols-2 gap-3 will-change-transform"
              >
                <div className="rounded-lg border border-helix-text/10 bg-helix-bg/50 p-4">
                  <span className="text-helix-muted text-sm line-through">{item.before}</span>
                </div>
                <div className="rounded-lg border border-helix-accent/20 bg-helix-accent/5 p-4">
                  <span className="text-helix-text text-sm font-medium">{item.after}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Careful messaging */}
          <div className="rounded-lg border border-helix-text/10 bg-helix-bg/50 p-6 mb-10">
            <p className="text-helix-text text-base mb-3">
              At that point, businesses often begin to scale differently—whether 
              that&apos;s expansion, partnerships, or positioning for larger opportunities.
            </p>
            <p className="text-helix-muted text-sm">
              We are not promising exponential growth. We are saying that when your 
              operations run cleanly, your options open up. You get to choose what 
              comes next—instead of reacting to whatever the day throws at you.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button onClick={scrollToContact} className="btn-primary">
              See What This Looks Like Inside Your Business
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
