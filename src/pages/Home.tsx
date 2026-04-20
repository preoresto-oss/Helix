import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import StatementSection from '../sections/StatementSection';
import TruthSection from '../sections/TruthSection';
import RealitySection from '../sections/RealitySection';
import SolutionsSection from '../sections/SolutionsSection';
import ResultsSection from '../sections/ResultsSection';
import ClientsSection from '../sections/ClientsSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import ObjectionSection from '../sections/ObjectionSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';
import FeatureSection from '../sections/FeatureSection';
import ManifestoSection from '../sections/ManifestoSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            const inPinned = pinnedRanges.some((r) => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0);
            return target;
          },
          duration: { min: 0.15, max: 0.35 }, delay: 0, ease: 'power2.out',
        },
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" />
      <div className="vignette" />
      <Navigation />

      <main className="relative">
        {/* 1. Hero — system network background */}
        <HeroSection />

        {/* 2. Positioning statement — abstract layers */}
        <StatementSection statement="Built for the field. Used by the office." image="/abstract_layers.jpg" zIndex={20} />

        {/* 3. The truth */}
        <TruthSection />

        {/* 4. What we see */}
        <RealitySection />

        {/* 5. What We Automate */}
        <SolutionsSection />

        {/* 6. Your systems — dashboard UI */}
        <FeatureSection headline="Your systems. Your workflows." body="Helix AI connects to your existing stack—no rip-and-replace. Daily logs, RFIs, and cost reports happen automatically behind the scenes." cta="See how it works" image="/dashboard_ui.jpg" zIndex={35} layout="left-photo" />

        {/* 7. No replacement — system background */}
        <ManifestoSection headline="No replacement. Just leverage." subheadline="AI handles repetitive coordination—so your team stays on the tools and on schedule." image="/hero_system.jpg" zIndex={40} />

        {/* 8. How It Works */}
        <HowItWorksSection />

        {/* 9. Results — workflow flowcharts */}
        <ResultsSection />

        {/* 10. Clients Served */}
        <ClientsSection />

        {/* 11. One source of truth — architectural aerial */}
        <FeatureSection headline="One source of truth." body="Eliminate duplicate data and version confusion. One dashboard keeps field updates, costs, and schedules aligned—automatically." cta="Explore integrations" image="/arch_aerial.jpg" zIndex={55} layout="right-photo" />

        {/* 12. Cut admin — abstract layers */}
        <ManifestoSection headline="Cut admin. Protect margin." subheadline="Reduce overhead hours and catch cost drift before it becomes a change order." image="/abstract_layers.jpg" zIndex={60} />

        {/* 13. Objection handling */}
        <ObjectionSection />

        {/* 14. Keep teams in sync — dashboard UI */}
        <FeatureSection headline="Keep teams in sync." body="Field notes become tasks. Tasks become updates. Updates become reports—without extra apps." cta="See the workflow" image="/dashboard_ui.jpg" zIndex={65} layout="left-photo" />

        {/* 15. Built for contractors — architectural aerial */}
        <StatementSection statement="Built for contractors. Trusted by crews." image="/arch_aerial.jpg" zIndex={70} />

        {/* 16. Less rework — system background */}
        <ManifestoSection headline="Less rework. More output." subheadline="AI catches discrepancies early—so the build stays on plan and on budget." image="/hero_system.jpg" zIndex={75} showCta ctaText="See what this looks like inside your business" />

        {/* 17. About */}
        <AboutSection />

        {/* 18. Contact */}
        <ContactSection />
      </main>
    </div>
  );
}
