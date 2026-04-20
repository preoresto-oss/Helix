import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(bgRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.2 }, 0);
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03 }, 0.3);
      }
      tl.fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55);
      tl.fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, 0.7);
      tl.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.85);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([bgRef.current, headlineRef.current, subRef.current, ctaRef.current, labelRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1,
            });
          },
        },
      });
      scrollTl.fromTo(bgRef.current, { opacity: 1 }, { opacity: 0.3, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo([headlineRef.current, subRef.current, ctaRef.current, labelRef.current], { opacity: 1, y: 0 }, { opacity: 0, y: -20, ease: 'power2.in', stagger: 0.02 }, 0.7);
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="section-pinned bg-helix-bg z-10">
      {/* Abstract system background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img src="/hero_system.jpg" alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-helix-bg via-helix-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-helix-bg via-transparent to-helix-bg/40" />
      </div>

      {/* Content */}
      <div className="relative w-full px-[6vw]" style={{ maxWidth: '720px', position: 'absolute', left: '6vw', top: '28vh' }}>
        <span ref={labelRef} className="micro-label block mb-6 will-change-transform">
          OPERATIONAL SYSTEMS FOR CONSTRUCTION
        </span>

        <h1 ref={headlineRef} className="font-heading font-semibold text-helix-text mb-6 will-change-transform" style={{ fontSize: 'clamp(36px, 4.5vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
          <span className="word inline-block">Operational</span>{' '}
          <span className="word inline-block">systems</span>{' '}
          <span className="word inline-block">that</span>{' '}
          <span className="word inline-block">run</span>{' '}
          <span className="word inline-block">your</span>{' '}
          <span className="word inline-block">business</span>{' '}
          <span className="word inline-block text-helix-accent">.</span>
        </h1>

        <p ref={subRef} className="text-helix-muted mb-8 will-change-transform" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '480px' }}>
          Helix AI builds workflow automation, reporting infrastructure, and operational intelligence for contractors and trades. Same team. Cleaner systems. More output.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 will-change-transform">
          <button onClick={scrollToContact} className="btn-primary">
            Book a Strategy Call
          </button>
          <button onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">
            View Capabilities
          </button>
        </div>
      </div>
    </section>
  );
}
