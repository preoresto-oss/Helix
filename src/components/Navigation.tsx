import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Solutions', target: 'solutions' },
  { label: 'Results', target: 'results' },
  { label: 'About', target: 'about' },
  { label: 'Contact', target: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        scrolled ? 'bg-helix-bg/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-[6vw] flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-bold text-lg tracking-tight text-helix-text hover:opacity-80 transition-opacity"
        >
          Helix AI
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollToSection(link.target)}
              className="text-sm font-medium text-helix-muted hover:text-helix-text transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary text-sm py-2.5 px-5"
          >
            Book a Call
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-helix-text p-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-helix-bg/95 backdrop-blur-md border-t border-helix-text/10 py-5 px-[6vw]">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="text-left text-base font-medium text-helix-muted hover:text-helix-text transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
