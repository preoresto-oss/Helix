import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoSectionProps {
  headline: string;
  subheadline: string;
  image: string;
  zIndex: number;
  showCta?: boolean;
  ctaText?: string;
  id?: string;
}

export default function ManifestoSection({ headline, subheadline, image, zIndex, showCta, ctaText, id }: ManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 },
      });

      scrollTl.fromTo(bgRef.current, { scale: 1.05, opacity: 0 }, { scale: 1.0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(ruleRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.05);

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.03, ease: 'none' }, 0.1);
      }

      scrollTl.fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, ease: 'none' }, 0.14);

      if (ctaRef.current) {
        scrollTl.fromTo(ctaRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, ease: 'none' }, 0.18);
      }

      scrollTl.fromTo(bgRef.current, { scale: 1.0, opacity: 1 }, { scale: 1.02, opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(ruleRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words, { opacity: 1, y: 0 }, { opacity: 0, y: -8, stagger: 0.01, ease: 'power2.in' }, 0.7);
      }

      scrollTl.fromTo(subRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      if (ctaRef.current) scrollTl.fromTo(ctaRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.78);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="section-pinned" style={{ zIndex }}>
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="absolute flex flex-col items-center text-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '720px', zIndex: 10 }}>
        <div ref={ruleRef} className="orange-rule mb-8 will-change-transform" style={{ transformOrigin: 'center' }} />

        <h2 ref={headlineRef} className="font-heading font-semibold text-helix-text mb-5 will-change-transform" style={{ fontSize: 'clamp(32px, 4.5vw, 68px)', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
          {headline.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">{word}</span>
          ))}
        </h2>

        <p ref={subRef} className="text-helix-text/65 max-w-lg will-change-transform" style={{ fontSize: 'clamp(14px, 1.2vw, 18px)', lineHeight: 1.6 }}>{subheadline}</p>

        {showCta && ctaText && (
          <button ref={ctaRef} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary mt-10 will-change-transform">{ctaText}</button>
        )}
      </div>
    </section>
  );
}
