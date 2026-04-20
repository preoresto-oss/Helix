import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const workflows = [
  {
    id: 'invoice',
    title: 'Invoice & AP Workflow',
    steps: [
      { label: 'Invoice Received', type: 'input' },
      { label: 'AI Extracts Data', type: 'process' },
      { label: 'Coding / Approval Route', type: 'process' },
      { label: 'Human Approval', type: 'checkpoint' },
      { label: 'Payment Queue', type: 'process' },
      { label: 'Audit Log + Dashboard', type: 'output' },
    ],
  },
  {
    id: 'field',
    title: 'Field Reporting Workflow',
    steps: [
      { label: 'Voice / Photo / Notes', type: 'input' },
      { label: 'AI Structures Report', type: 'process' },
      { label: 'Weather / Log Data', type: 'process' },
      { label: 'PM Review', type: 'checkpoint' },
      { label: 'Report Issued', type: 'process' },
      { label: 'Executive Visibility', type: 'output' },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance Workflow',
    steps: [
      { label: 'Insurance / License Uploaded', type: 'input' },
      { label: 'Expiration Monitoring', type: 'process' },
      { label: 'Reminder Triggered', type: 'process' },
      { label: 'Exception Flagged', type: 'alert' },
      { label: 'Human Review', type: 'checkpoint' },
      { label: 'Dashboard Updated', type: 'output' },
    ],
  },
  {
    id: 'executive',
    title: 'Executive Reporting Workflow',
    steps: [
      { label: 'Data From All Systems', type: 'input' },
      { label: 'AI Synthesizes', type: 'process' },
      { label: 'Trend Analysis', type: 'process' },
      { label: 'Owner Review', type: 'checkpoint' },
      { label: 'Action Items Routed', type: 'process' },
      { label: 'Decision Dashboard', type: 'output' },
    ],
  },
  {
    id: 'fleet',
    title: 'Fleet & Maintenance Workflow',
    steps: [
      { label: 'Mileage / Hours Logged', type: 'input' },
      { label: 'Service Interval Detected', type: 'process' },
      { label: 'Maintenance Task Created', type: 'process' },
      { label: 'Approval If Needed', type: 'checkpoint' },
      { label: 'Work Completed', type: 'process' },
      { label: 'Asset Status Updated', type: 'output' },
    ],
  },
];

function FlowchartSVG({ steps }: { steps: typeof workflows[0]['steps'] }) {
  const boxW = 140;
  const boxH = 40;
  const gap = 56;
  const totalW = steps.length * boxW + (steps.length - 1) * gap;
  const startX = 0;
  const cy = 60;

  const typeColor = (type: string) => {
    switch (type) {
      case 'input': return { fill: '#11141A', stroke: '#5B8DEF', text: '#F6F7FB' };
      case 'output': return { fill: '#11141A', stroke: '#5B8DEF', text: '#F6F7FB' };
      case 'checkpoint': return { fill: '#5B8DEF12', stroke: '#5B8DEF', text: '#F6F7FB' };
      case 'alert': return { fill: '#5B8DEF18', stroke: '#5B8DEF', text: '#5B8DEF' };
      default: return { fill: '#0B0D10', stroke: '#8A8F9930', text: '#8A8F99' };
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case 'input': return 'INPUT';
      case 'output': return 'OUTPUT';
      case 'checkpoint': return 'HUMAN CHECK';
      case 'alert': return 'FLAG';
      default: return 'AUTO';
    }
  };

  return (
    <svg viewBox={`0 0 ${totalW} 140`} className="w-full h-auto" style={{ minWidth: '600px' }}>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#B8BDC740" />
        </marker>
      </defs>
      {steps.map((step, i) => {
        const x = startX + i * (boxW + gap);
        const colors = typeColor(step.type);
        const label = typeLabel(step.type);
        return (
          <g key={i}>
            {/* Arrow */}
            {i < steps.length - 1 && (
              <line x1={x + boxW} y1={cy} x2={x + boxW + gap - 4} y2={cy} stroke="#B8BDC730" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            )}
            {/* Box */}
            <rect x={x} y={cy - boxH / 2} width={boxW} height={boxH} rx="6" fill={colors.fill} stroke={colors.stroke} strokeWidth={step.type === 'checkpoint' || step.type === 'alert' ? 1.5 : 1} />
            {/* Text */}
            <text x={x + boxW / 2} y={cy + 1} textAnchor="middle" fill={colors.text} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">
              {step.label}
            </text>
            {/* Type label */}
            <text x={x + boxW / 2} y={cy + boxH / 2 + 16} textAnchor="middle" fill="#B8BDC760" fontSize="8" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.1em">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      const cards = section.querySelectorAll('.result-card');
      gsap.fromTo(cards, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="results" className="relative bg-helix-bg py-16 lg:py-20" style={{ zIndex: 19 }}>
      <div className="w-full px-[6vw]">
        <div ref={headingRef} className="mb-10 will-change-transform">
          <div className="orange-rule mb-5" />
          <h2 className="font-heading font-bold text-helix-text mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            What Helix AI actually delivers
          </h2>
          <p className="text-helix-muted max-w-2xl" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            Operational systems that track, monitor, complete, and audit workflows—with human checkpoints at the right moments.
          </p>
        </div>

        {/* Workflow Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {workflows.map((wf, i) => (
            <button
              key={wf.id}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === i
                  ? 'bg-helix-accent text-white'
                  : 'border border-helix-text/10 text-helix-muted hover:text-helix-text hover:border-helix-text/20'
              }`}
            >
              {wf.title}
            </button>
          ))}
        </div>

        {/* Active Flowchart */}
        <div className="result-card rounded-xl border border-helix-text/10 bg-helix-bg/50 p-6 mb-8 overflow-x-auto will-change-transform">
          <h3 className="font-heading font-semibold text-helix-text text-lg mb-4">{workflows[activeTab].title}</h3>
          <FlowchartSVG steps={workflows[activeTab].steps} />
        </div>

        {/* Deliverables Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { title: 'Workflow Visibility', desc: 'See where work stands at any moment. No more chasing for status updates.' },
            { title: 'System Monitoring', desc: 'Continuous tracking of deadlines, expirations, and exceptions.' },
            { title: 'Human Checkpoints', desc: 'AI handles routine work. Humans approve decisions that matter.' },
            { title: 'Audit & Accountability', desc: 'Every action logged. Every workflow traceable. Full operational accountability.' },
          ].map((item, i) => (
            <div key={i} className="result-card rounded-lg border border-helix-text/10 bg-helix-bg/50 p-5 will-change-transform">
              <h4 className="font-heading font-semibold text-helix-text text-sm mb-2">{item.title}</h4>
              <p className="text-helix-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Core Concept Box */}
        <div className="result-card rounded-xl border border-helix-accent/15 bg-helix-accent/5 p-6 will-change-transform">
          <h4 className="font-heading font-semibold text-helix-text text-base mb-4">How Helix AI systems work</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {[
              'Data comes in from field, office, or external systems',
              'AI agents process, organize, and categorize',
              'Workflows trigger automatically based on rules',
              'Progress is monitored in real time',
              'Exceptions are flagged for immediate attention',
              'Approvals route to humans at decision points',
              'Tasks complete and log automatically',
              'Leadership gets full visibility into what happened',
              'Audit trail exists for every workflow',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-helix-accent text-xs font-mono mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-helix-text/80 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={scrollToContact} className="btn-primary">
            See What This Looks Like In Your Business
          </button>
        </div>
      </div>
    </section>
  );
}
