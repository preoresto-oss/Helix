import { useCallback } from 'react';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import LandingHero from '../sections/LandingHero';
import TruthSection from '../sections/TruthSection';
import RealitySection from '../sections/RealitySection';
import SolutionsSection from '../sections/SolutionsSection';
import ResultsSection from '../sections/ResultsSection';
import ClientsSection from '../sections/ClientsSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import ObjectionSection from '../sections/ObjectionSection';

function LandingContact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative bg-helix-bg pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ zIndex: 100 }}>
      <div className="w-full px-[6vw]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="orange-rule mx-auto mb-5" />
          <h2 className="font-heading font-bold text-helix-text mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Let&apos;s identify where your business is losing time
          </h2>
          <p className="text-helix-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            Book a free strategy call. We&apos;ll map your first automation workflow
            in one week—clear scope, flat price, no surprises.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
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
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">EMAIL</label>
                    <input type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors"
                      placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label className="micro-label block mb-2">COMPANY</label>
                  <input type="text" value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors"
                    placeholder="Your company name" />
                </div>
                <div>
                  <label className="micro-label block mb-2">WHAT WOULD YOU LIKE TO AUTOMATE?</label>
                  <textarea rows={4} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-helix-bg border border-helix-bg rounded-lg px-4 py-3 text-helix-text text-sm focus:outline-none focus:border-helix-accent transition-colors resize-none"
                    placeholder="Tell us about your biggest operational frustration..." />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Book My Strategy Call
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <p className="text-helix-muted text-xs text-center mt-3">Free 30-minute call. No commitment required.</p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-helix-text/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-helix-muted text-sm">&copy; Helix AI. Productized systems for construction.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-helix-muted text-sm hover:text-helix-text transition-colors">Privacy</a>
              <a href="#" className="text-helix-muted text-sm hover:text-helix-text transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" />
      <div className="vignette" />
      <Navigation />

      <main className="relative">
        <LandingHero onCtaClick={scrollToContact} />
        <TruthSection />
        <RealitySection />
        <SolutionsSection />
        <ResultsSection />
        <ClientsSection />
        <HowItWorksSection />
        <ObjectionSection />
        <LandingContact />
      </main>
    </div>
  );
}
