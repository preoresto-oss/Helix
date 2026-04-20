import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'Crane Construction Group Inc.',
  'NorthForm Co',
  'United MEP Corporation',
  'Preos Construction',
  'ALD Mechanical',
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      const items = section.querySelectorAll('.client-item');
      gsap.fromTo(items, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-helix-bg py-12 lg:py-16 border-y border-helix-text/5" style={{ zIndex: 20 }}>
      <div className="w-full px-[6vw]">
        <div ref={contentRef} className="text-center mb-8 will-change-transform">
          <span className="micro-label block mb-4">TRUSTED BY OPERATORS IN THE FIELD</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {clients.map((client, i) => (
            <div
              key={i}
              className="client-item font-heading font-semibold text-helix-text/40 text-sm lg:text-base tracking-wide will-change-transform"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
