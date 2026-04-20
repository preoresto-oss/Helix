import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TruthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      const items = section.querySelectorAll('.truth-item');
      gsap.fromTo(items, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-helix-bg py-16 lg:py-20" style={{ zIndex: 15 }}>
      <div className="w-full px-[6vw]">
        <div ref={contentRef} className="max-w-4xl will-change-transform">
          <span className="micro-label block mb-5">THE REALITY</span>
          <h2 className="font-heading font-bold text-helix-text mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Most businesses don&apos;t have a people problem. They have a workflow problem.
          </h2>
          <p className="text-helix-muted mb-8 max-w-2xl" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            Inefficiencies build over time. Systems get layered on top of each other. Teams compensate manually. 
            Small inefficiencies compound daily—until they become the way things have always been done. 
            Most businesses aren&apos;t broken. They&apos;re just operating with friction that became normal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              'Processes that made sense years ago still run the same way',
              'Software was adopted but never fully integrated',
              'Key people hold information that never gets documented',
              'Reporting happens when someone remembers',
              'Follow-ups depend on someone having bandwidth',
              'Critical details live in email threads and texts',
            ].map((item, i) => (
              <div key={i} className="truth-item flex items-start gap-3 p-3.5 rounded-lg border border-helix-text/5 bg-helix-bg/50 will-change-transform">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5"><circle cx="7" cy="7" r="5.5" stroke="#5B8DEF" strokeWidth="1.2" /><circle cx="7" cy="7" r="2" fill="#FF4D2E" /></svg>
                <span className="text-helix-text/80 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border-l-2 border-helix-accent bg-helix-accent/5 p-5">
            <p className="text-helix-text font-medium text-sm mb-1">We don&apos;t rebuild your business. We clean up the way it runs.</p>
            <p className="text-helix-muted text-sm">We don&apos;t replace your people. We improve the systems, workflows, and reporting around them so they can operate at a higher level.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
