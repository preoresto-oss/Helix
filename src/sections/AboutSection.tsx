import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  'Jobsite chaos',
  'Subcontractor management',
  'Insurance issues',
  'Estimating and bid tracking',
  'Project management overload',
  'Administrative bottlenecks',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Experience items stagger
      const items = section.querySelectorAll('.exp-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
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
      id="about"
      className="relative bg-helix-bg py-16 lg:py-20"
      style={{ zIndex: 59 }}
    >
      <div className="w-full px-[6vw] flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Content */}
        <div ref={contentRef} className="lg:w-1/2 will-change-transform">
          <div className="orange-rule mb-6" />

          <h2
            className="font-heading font-bold text-helix-text mb-6"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Built by someone who has lived the problems
          </h2>

          <p
            className="text-helix-muted mb-6"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
            }}
          >
            Helix AI was not built by a tech consultant guessing at how construction 
            works. It was built by someone with deep experience in custom homes, 
            landscaping, pools, roofing, and MEP—who understands the day-to-day 
            reality of running jobs, managing subs, and keeping the books straight.
          </p>

          <p
            className="text-helix-muted mb-8"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
            }}
          >
            Firsthand experience with the things that slow construction 
            companies down:
          </p>

          {/* Experience List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {experiences.map((exp, i) => (
              <li
                key={i}
                className="exp-item flex items-center gap-2 text-helix-text/90 text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7l3 3 5-5"
                    stroke="#5B8DEF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {exp}
              </li>
            ))}
          </ul>

          {/* Key Message */}
          <div className="rounded-lg border-l-2 border-helix-accent bg-helix-accent/5 p-5 mb-8">
            <p className="text-helix-text font-medium text-sm italic">
              &ldquo;We are not replacing your people. We are making your people 
              significantly more productive.&rdquo;
            </p>
          </div>

          <button onClick={scrollToContact} className="btn-primary">
            Book a Strategy Call
          </button>
        </div>

        {/* Image */}
        <div
          ref={imageRef}
          className="lg:w-1/2 will-change-transform"
        >
          <div className="image-card" style={{ height: '60vh' }}>
            <img
              src="/feature_meeting.jpg"
              alt="Construction team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
