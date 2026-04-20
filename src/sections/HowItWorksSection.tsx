import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Analyze current operations',
    description:
      'We map how your business actually runs—what systems you use, where the bottlenecks are, and what your team is spending time on.',
  },
  {
    number: '02',
    title: 'Identify inefficiencies',
    description:
      'We pinpoint the repetitive, manual work that is draining productivity and find the highest-impact automation opportunities.',
  },
  {
    number: '03',
    title: 'Layer AI on your existing systems',
    description:
      'We work with what you already use. No rip-and-replace. AI connects to your current stack and starts handling the low-value work.',
  },
  {
    number: '04',
    title: 'Automate workflows and train your team',
    description:
      'Your workflows run automatically. Your team gets trained on the new system. Productivity increases without headcount changes.',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
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

      // Steps stagger
      const stepEls = section.querySelectorAll('.step-card');
      gsap.fromTo(
        stepEls,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
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
      id="how-it-works"
      className="relative bg-helix-bg py-16 lg:py-20"
      style={{ zIndex: 57 }}
    >
      <div className="w-full px-[6vw]">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-10 will-change-transform">
          <div className="orange-rule mx-auto mb-5" />
          <h2
            className="font-heading font-bold text-helix-text mb-3"
            style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            How It Works
          </h2>
          <p className="text-helix-muted max-w-xl mx-auto" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            We work with what you already use. Clear scope, flat price, no surprises.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="step-card relative rounded-xl border border-helix-text/10 bg-helix-bg/50 backdrop-blur-sm p-6 will-change-transform"
            >
              {/* Step Number */}
              <span
                className="font-heading font-bold text-helix-accent/30 block mb-4"
                style={{ fontSize: '48px', lineHeight: 1 }}
              >
                {step.number}
              </span>

              {/* Connector Line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-helix-accent/20" />
              )}

              {/* Title */}
              <h3 className="font-heading font-semibold text-helix-text text-lg mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-helix-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 text-center">
          <p className="text-helix-muted text-sm mb-6 max-w-xl mx-auto">
            We do not replace your people. We increase the output, accuracy, and 
            efficiency of the people you already have.
          </p>
          <button onClick={scrollToContact} className="btn-primary">
            Book a Strategy Call
          </button>
        </div>
      </div>
    </section>
  );
}
