import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  statement: string;
  image: string;
  zIndex: number;
  id?: string;
}

export default function StatementSection({ statement, image, zIndex, id }: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 },
      });

      scrollTl.fromTo(photoRef.current, { scale: 1.06, opacity: 0 }, { scale: 1.0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(paperRef.current, { x: '110vw' }, { x: 0, ease: 'none' }, 0);

      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.02, ease: 'none' }, 0.05);
      }

      scrollTl.fromTo(photoRef.current, { scale: 1.0, opacity: 1 }, { scale: 1.03, opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(paperRef.current, { x: 0 }, { x: '-110vw', ease: 'power2.in' }, 0.7);

      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words, { opacity: 1, y: 0 }, { opacity: 0, y: -8, stagger: 0.01, ease: 'power2.in' }, 0.7);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="section-pinned" style={{ zIndex }}>
      <div ref={photoRef} className="absolute inset-0 will-change-transform">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div ref={paperRef} className="absolute inset-0 bg-helix-paper will-change-transform" />

      <h2 ref={textRef} className="absolute font-heading font-semibold text-helix-bg text-center will-change-transform"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '70vw', fontSize: 'clamp(30px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em', zIndex: 10 }}>
        {statement.split(' ').map((word, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">{word}</span>
        ))}
      </h2>
    </section>
  );
}
