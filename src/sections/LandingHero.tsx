import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface LandingHeroProps {
  onCtaClick: () => void;
}

export default function LandingHero({ onCtaClick }: LandingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.03 }, 0.2);
      }

      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
      tl.fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.65);
      tl.fromTo(trustRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-helix-bg flex items-center"
      style={{ zIndex: 10 }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/center_hardhats.jpg"
          alt="Construction team"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-helix-bg/80 via-helix-bg/70 to-helix-bg" />
      </div>

      <div className="relative w-full px-[7vw] pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Micro Label */}
          <span className="micro-label block mb-6">HELIX AI — OPERATIONAL AUTOMATION</span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-bold text-helix-text mb-6"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 84px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="word inline-block">Your</span>{' '}
            <span className="word inline-block">team</span>{' '}
            <span className="word inline-block">is</span>{' '}
            <span className="word inline-block">losing</span>{' '}
            <span className="word inline-block text-helix-accent">15+</span>{' '}
            <span className="word inline-block">hours</span>{' '}
            <span className="word inline-block">a</span>{' '}
            <span className="word inline-block">week</span>{' '}
            <span className="word inline-block">to</span>{' '}
            <span className="word inline-block">work</span>{' '}
            <span className="word inline-block">that</span>{' '}
            <span className="word inline-block">should</span>{' '}
            <span className="word inline-block">be</span>{' '}
            <span className="word inline-block">automatic.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-helix-muted mb-8 max-w-2xl"
            style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.6 }}
          >
            Helix AI builds custom automation systems for construction companies—
            daily logs, invoicing, compliance tracking, reporting, and more. Same team. 
            Same hours. Significantly more output. No people replaced.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-10">
            <button onClick={onCtaClick} className="btn-primary text-base py-4 px-8">
              Book a Free Strategy Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={onCtaClick} className="btn-outline text-base py-4 px-8">
              See What We Automate
            </button>
          </div>

          {/* Trust Indicators */}
          <div ref={trustRef} className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l2 4h4l-3 3 1 4-4-3-4 3 1-4-3-3h4l2-4z" fill="#FF4D2E" />
              </svg>
              <span className="text-helix-muted text-xs">Built by construction operators</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#FF4D2E" strokeWidth="1.5" />
                <path d="M8 4v4l3 1.5" stroke="#FF4D2E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-helix-muted text-xs">Live in one week</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3 3 7-7" stroke="#FF4D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-helix-muted text-xs">Flat pricing, no surprises</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
