import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  'Daily logs & field reports',
  'Cost tracking & budget alerts',
  'Schedule coordination',
  'RFI + submittal routing',
  'Safety checklist automation',
  'Photo documentation',
  'Invoice processing',
  'Collections follow-up',
  'Executive reporting',
  'COI tracking',
  'Equipment maintenance',
  'Marketing content',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      const items = section.querySelectorAll('.cap-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { y: -24 },
        {
          y: 24, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative bg-helix-bg pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ zIndex: 110 }}>
      <div className="w-full px-[6vw] flex flex-col lg:flex-row gap-10 lg:gap-8">
        {/* Left Column */}
        <div ref={contentRef} className="lg:w-[55%] will-change-transform">
          <div className="orange-rule mb-6" />

          <h2
            className="font-heading font-bold text-helix-text mb-4"
            style={{ fontSize: 'clamp(32px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Let&apos;s identify where your business is losing time—and fix it.
          </h2>

          <p
            className="text-helix-muted mb-8 max-w-xl"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6 }}
          >
            Tell us what you&apos;re building. We&apos;ll map the first AI workflow in 
            one week—clear scope, flat price, no surprises.
          </p>

          {/* Capabilities */}
          <div className="mb-8">
            <h3 className="micro-label mb-3">WHAT WE AUTOMATE</h3>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="cap-item inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-helix-text/10 text-helix-text/80 text-xs bg-helix-bg/50 will-change-transform"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#5B8DEF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl p-6" style={{ backgroundColor: '#11141A' }}>
            {submitted ? (
              <div className="text-center py-8">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
                  <circle cx="24" cy="24" r="24" fill="#5B8DEF" fillOpacity="0.15" />
                  <path d="M14 24l7 7 13-13" stroke="#5B8DEF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-heading font-semibold text-helix-text text-lg mb-2">Message sent!</h3>
                <p className="text-helix-muted text-sm">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="micro-label block mb-2">NAME</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">EMAIL</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors" placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label className="micro-label block mb-2">COMPANY</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors" placeholder="Your company name" />
                </div>
                <div>
                  <label className="micro-label block mb-2">WHAT WOULD YOU LIKE TO AUTOMATE?</label>
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors resize-none"
                    placeholder="Tell us about your biggest operational frustration..." />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Send
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-[45%] hidden lg:block">
          <div ref={imageRef} className="sticky top-[14vh] image-card will-change-transform" style={{ height: '72vh' }}>
            <img src="/closing_team.jpg" alt="Construction team" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-[7vw] mt-16 pt-8 border-t border-helix-text/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-helix-muted text-sm">© Helix AI. Productized systems for construction.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-helix-muted text-sm hover:text-helix-text transition-colors">Privacy</a>
            <a href="#" className="text-helix-muted text-sm hover:text-helix-text transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
}
