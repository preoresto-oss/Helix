import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'field-ops',
    title: 'Field Operations',
    problem: 'Superintendents spend too much time on documentation and not enough time managing the job. Daily logs get delayed, photos sit unorganized, and field reports require hours of manual work.',
    capabilities: [
      'Daily log automation from voice notes and photos',
      'Voice memo to structured field report',
      'Jobsite photo organization with auto-tagging',
      'Weather impact reporting and delay documentation',
      'Schedule impact summaries for project stakeholders',
      'Owner and client progress updates—auto-generated',
      'Jobsite activity logging without manual entry',
      'Superintendent time freed from paperwork',
    ],
    outcomes: [
      'Daily logs completed same-day, every day',
      'Zero photo management overhead',
      'Consistent, professional field reporting',
      'Superintendents back on the job, not the computer',
    ],
  },
  {
    id: 'project-mgmt',
    title: 'Project Management',
    problem: 'Project managers are buried in coordination work. RFIs go unanswered, change orders pile up, and meeting action items get lost in email threads. The administrative load is crushing delivery speed.',
    capabilities: [
      'RFI and submittal tracking with auto-escalation',
      'Change order drafting and routing for approval',
      'Meeting summaries with action item extraction',
      'Bid log management without spreadsheets',
      'Scope gap review before work begins',
      'Cross-platform project board syncing (Trello, Monday, Notion)',
      'Deadline reminders and overdue alerts',
      'Status report generation for stakeholders',
    ],
    outcomes: [
      'No more lost RFIs or missed submittals',
      'Change orders processed in hours, not weeks',
      'Meeting follow-up happens automatically',
      'PMs focused on delivery, not data entry',
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Back Office',
    problem: 'Your office team is buried in invoice entry, follow-up, coding, reconciliation, and reporting. Cash flow visibility is poor, collections are reactive, and the books are always slightly behind.',
    capabilities: [
      'Invoice processing and data extraction',
      'AP approval workflows with routing rules',
      'AR follow-up automation with personalized reminders',
      'Collections prioritization by age and amount',
      'Bookkeeping reconciliation assistance',
      'Transaction logging and audit trail creation',
      'Cash flow forecasting from receivables data',
      'Expense auditing and anomaly detection',
    ],
    outcomes: [
      'Invoices processed same-day they arrive',
      'Collections follow-up never forgotten',
      'Cleaner books with less manual entry',
      'Real cash flow visibility, not guesses',
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance & Risk',
    problem: 'Insurance certificates expire without anyone noticing. Licenses need renewing but there is no system to track them. Cost codes get misapplied. Risk accumulates quietly until it becomes a real problem.',
    capabilities: [
      'Subcontractor COI tracking with expiration alerts',
      'License and certification renewal monitoring',
      'Cost code enforcement in real-time',
      'Margin risk detection from job costing data',
      'Audit support workflow preparation',
      'Document compliance verification',
      'Non-compliant vendor blocking',
      'Insurance gap identification',
    ],
    outcomes: [
      'Zero expired COIs on active jobsites',
      'Licenses renewed before deadlines',
      'Cost code errors caught immediately',
      'Risk visible before it becomes expensive',
    ],
  },
  {
    id: 'fleet',
    title: 'Fleet, Equipment & Inventory',
    problem: 'Tools get lost. Equipment maintenance gets deferred. Inventory counts are annual events that take days. Nobody knows exactly what they have, where it is, or when it needs service.',
    capabilities: [
      'Vehicle mileage tracking with automated logging',
      'Equipment hour monitoring from usage data',
      'Maintenance scheduling based on hours or calendar',
      'Fleet utilization analysis and right-sizing',
      'Inventory audits with barcode and photo support',
      'Material usage monitoring per job',
      'Asset location tracking and check-in/check-out',
      'Tool loss prevention with usage alerts',
    ],
    outcomes: [
      'Maintenance happens on schedule, not after breakdowns',
      'Tool and equipment location always known',
      'Inventory counted continuously, not once a year',
      'Reduced loss and better asset utilization',
    ],
  },
  {
    id: 'executive',
    title: 'Executive Reporting',
    problem: 'Leadership decisions are based on incomplete or outdated information. Company performance is spread across systems. Board reporting takes days to compile. Nobody has a clear, real-time picture of the business.',
    capabilities: [
      'Executive summary orchestration from project data',
      'Company operating thesis generation from KPI trends',
      'Weekly executive briefings—auto-compiled',
      'Monthly board reporting with professional formatting',
      'Company health dashboards with live metrics',
      'Owner decision support with scenario modeling',
      'Performance trend analysis across all projects',
      'Cross-company visibility for multi-entity owners',
    ],
    outcomes: [
      'Leadership sees the full picture in real time',
      'Board reports generated in minutes, not days',
      'Decisions based on data, not gut feel',
      'Company performance visible at every level',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth',
    problem: 'Great work gets done but never gets documented. Case studies never get written. The website stays outdated. Marketing is an afterthought because operations take all the attention.',
    capabilities: [
      'Marketing planning and content calendar creation',
      'SEO content briefs for service pages',
      'Service page writing from project data',
      'Local SEO visibility improvement',
      'Case study generation from completed projects',
      'Content repurposing across channels',
      'Review solicitation and reputation management',
      'Competitive positioning analysis',
    ],
    outcomes: [
      'Completed projects become marketing assets',
      'Website stays current without dedicated staff',
      'Local search visibility improves organically',
      'Growth engine runs parallel to operations',
    ],
  },
];

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const catsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      const cats = section.querySelectorAll('.solution-category');
      gsap.fromTo(
        cats,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: catsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative bg-helix-bg py-16 lg:py-20"
      style={{ zIndex: 18 }}
    >
      <div className="w-full px-[6vw]">
        {/* Section Header */}
        <div ref={headingRef} className="mb-10 will-change-transform">
          <div className="orange-rule mb-5" />
          <h2
            className="font-heading font-bold text-helix-text mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            What We Automate
          </h2>
          <p className="text-helix-muted max-w-2xl" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            We do not replace your people. We improve the systems, workflows, and reporting around them. Here is exactly where we do it.
          </p>
        </div>

        {/* Categories */}
        <div ref={catsRef} className="space-y-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="solution-category rounded-xl border border-helix-text/10 bg-helix-bg/50 backdrop-blur-sm overflow-hidden will-change-transform"
            >
              {/* Category Header */}
              <div className="p-6 sm:p-8 border-b border-helix-text/5">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="lg:max-w-[60%]">
                    <h3
                      className="font-heading font-bold text-helix-text mb-3"
                      style={{ fontSize: 'clamp(22px, 2vw, 32px)', lineHeight: 1.1 }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-helix-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                      {cat.problem}
                    </p>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="btn-primary text-sm py-3 px-5 self-start flex-shrink-0"
                  >
                    Explore {cat.title.split(' ')[0]}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Two Column: Capabilities + Outcomes */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Capabilities */}
                <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-helix-text/5">
                  <h4 className="micro-label mb-4">WHAT WE AUTOMATE</h4>
                  <ul className="space-y-2.5">
                    {cat.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-helix-text/85 text-sm">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                          <path d="M3 7l3 3 5-5" stroke="#5B8DEF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="p-6 sm:p-8">
                  <h4 className="micro-label mb-4">BUSINESS OUTCOMES</h4>
                  <ul className="space-y-2.5">
                    {cat.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-helix-text/85 text-sm">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                          <path d="M7 1l2 4.5L14 6l-3.5 3L11.5 13 7 10.5 2.5 13l1-4L0 6l4.5-.5L7 1z" fill="#5B8DEF" />
                        </svg>
                        {out}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-helix-muted text-sm mb-6 max-w-xl mx-auto">
            Every category above represents hours of manual work that your team 
            is doing today—work that can be handled automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToContact} className="btn-primary">
              Find Operational Gaps
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={scrollToContact} className="btn-outline">
              View All Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
