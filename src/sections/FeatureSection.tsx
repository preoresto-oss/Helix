import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  headline: string;
  body: string;
  cta: string;
  image: string;
  zIndex: number;
  layout: 'left-photo' | 'right-photo';
  id?: string;
}

export default function FeatureSection({ headline, body, cta, image, zIndex, layout, id }: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 },
      });

      const photoStartX = layout === 'left-photo' ? '-60vw' : '60vw';
      const photoExitX = layout === 'left-photo' ? '-40vw' : '40vw';
      const panelStartX = layout === 'left-photo' ? '60vw' : '-60vw';
      const panelExitX = layout === 'left-photo' ? '40vw' : '-40vw';

      scrollTl.fromTo(photoRef.current, { x: photoStartX, opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(panelRef.current, { x: panelStartX, opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.03, ease: 'none' }, 0.08);
      }

      scrollTl.fromTo([bodyRef.current, ctaRef.current], { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.02, ease: 'none' }, 0.12);

      scrollTl.fromTo(photoRef.current, { x: 0, opacity: 1 }, { x: photoExitX, opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(panelRef.current, { x: 0, opacity: 1 }, { x: panelExitX, opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, [layout]);

  const isLeftPhoto = layout === 'left-photo';

  return (
    <section ref={sectionRef} id={id} className="section-pinned bg-helix-bg" style={{ zIndex }}>
      <div ref={photoRef} className="absolute image-card will-change-transform"
        style={{ left: isLeftPhoto ? '7vw' : '52vw', top: '16vh', width: isLeftPhoto ? '44vw' : '41vw', height: '68vh' }}>
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      <div ref={panelRef} className="absolute text-panel will-change-transform"
        style={{ left: isLeftPhoto ? '56vw' : '7vw', top: '20vh', width: isLeftPhoto ? '37vw' : '40vw', minHeight: '52vh' }}>
        <h2 ref={headlineRef} className="font-heading font-semibold text-helix-bg mb-5" style={{ fontSize: 'clamp(24px, 2.5vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          {headline.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
          ))}
        </h2>
        <p ref={bodyRef} className="text-helix-bg/60 mb-6" style={{ fontSize: '14px', lineHeight: 1.6 }}>{body}</p>
        <button ref={ctaRef} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="cta-link">{cta}</button>
      </div>
    </section>
  );
}
