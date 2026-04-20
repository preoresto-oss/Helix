import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
  'daily logs',
  'invoice processing',
  'collections follow-up',
  'subcontractor insurance tracking',
  'maintenance reminders',
  'inventory audits',
  'executive reporting',
  'board updates',
  'project board syncing',
  'RFI routing',
  'change order drafts',
  'schedule updates',
];

export default function SmallStuffSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Items stagger
      const itemEls = section.querySelectorAll('.stuff-item');
      gsap.fromTo(
        itemEls,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative bg-helix-bg py-[12vh]"
      style={{ zIndex: 56 }}
    >
      <div className="w-full px-[7vw]">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center will-change-transform">
          {/* Section Label */}
          <span className="micro-label block mb-6">THE REAL WORKLOAD</span>

          {/* Headline */}
          <h2
            className="font-heading font-bold text-helix-text mb-6"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Built for the small stuff that slows companies down
          </h2>

          {/* Subtext */}
          <p
            className="text-helix-muted mb-10 max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
            }}
          >
            Your best people are spending hours on tasks that should not require 
            their time. These are the things Helix eliminates.
          </p>

          {/* Items Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {items.map((item, i) => (
              <span
                key={i}
                className="stuff-item inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-helix-text/10 text-helix-text/90 text-sm bg-helix-bg/50 backdrop-blur-sm will-change-transform"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="#FF4D2E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button onClick={scrollToContact} className="btn-primary">
            See What We Automate
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M10 5l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
