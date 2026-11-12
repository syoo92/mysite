import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";

type IconProps = { className?: string; size?: number };
export function Arrow({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
export function Flower({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor" aria-hidden="true">
      <path d="M33 4h14l-2 24 16-18 10 10-19 16 24-3v14l-24-2 19 16-10 10-16-19 2 24H33l2-24-16 19L9 61l19-16-24 2V33l24 3L9 20l10-10 16 18z" />
    </svg>
  );
}

export const projects = [
  {
    id: "folio",
    title: "Folio",
    subtitle: "Making money feel a little more human.",
    category: "Digital products",
    tags: ["Product strategy", "UX / UI design"],
    year: "2025",
    kind: "finance",
    role: "Product strategy, UX & UI",
    focus: "Everyday financial wellbeing",
    deliverables: "User flows, dashboard, visual system",
    decisions: [
      [
        "Clarity before detail",
        "Lead with one balance and a spending summary, then let people explore the numbers when they need them.",
      ],
      [
        "Progress, not pressure",
        "Frame savings around personal goals rather than warnings, so the experience feels encouraging.",
      ],
      [
        "A quieter visual language",
        "Use generous spacing, restrained color, and a clear type hierarchy to make dense information easier to scan.",
      ],
    ],
    description:
      "A calmer, clearer way to take control of your finances. Folio brings spending, saving, and everyday decisions into one thoughtfully simple experience.",
    challenge:
      "Money apps often offer more information than understanding. The challenge was to make complex financial data feel approachable without losing the detail people need.",
    solution:
      "I designed a focused overview, intuitive spending categories, and friendly savings goals. A soft visual language and progressive disclosure help people move from feeling overwhelmed to feeling in control.",
    result:
      "An end-to-end product concept that turns the daily money check-in into a reassuring habit.",
  },
  {
    id: "roam",
    title: "Roam",
    subtitle: "Less planning. More getting out there.",
    category: "Digital products",
    tags: ["Research", "Mobile app"],
    year: "2025",
    kind: "travel",
    role: "Experience design & UI",
    focus: "From inspiration to exploration",
    deliverables: "Discovery flow, place details, mobile UI",
    decisions: [
      [
        "Inspiration comes first",
        "Let places tell their own story through large imagery, with practical details a step away.",
      ],
      [
        "Keep planning lightweight",
        "Use flexible collections instead of a rigid itinerary, leaving space for plans to change.",
      ],
      [
        "Context at the right moment",
        "Bring location details, reviews, and next steps together so people can move from discovery to a decision.",
      ],
    ],
    description:
      "A considered travel companion for people who would rather explore than spend hours planning. Discover places, collect ideas, and make room for the unexpected.",
    challenge:
      "Trip planning is scattered across saved posts, maps, and notes. I explored how to bring inspiration and practical planning together without making travel feel like a task.",
    solution:
      "A visual discovery feed, lightweight itineraries, and collections that can grow organically. The experience puts beautiful places first and keeps the planning tools close at hand.",
    result:
      "A mobile-first concept that makes the journey from “someday” to “let’s go” feel effortless.",
  },
  {
    id: "canvas",
    title: "Canvas",
    subtitle: "A little clarity for big, messy ideas.",
    category: "Digital products",
    tags: ["Product design", "Design system"],
    year: "2024",
    kind: "workspace",
    role: "Product design & design system",
    focus: "Creative team collaboration",
    deliverables: "Workspace, task flows, component library",
    decisions: [
      [
        "Match the way teams think",
        "Offer a visual board for early exploration and more structured views when the work needs them.",
      ],
      [
        "Keep the conversation close",
        "Connect context to each task instead of making people hunt through separate tools.",
      ],
      [
        "Build a flexible foundation",
        "Use consistent navigation, card patterns, and status treatments that can grow with the workspace.",
      ],
    ],
    description:
      "A flexible home for creative teams to turn scattered thoughts into shared direction, from the first spark of an idea to the final handoff.",
    challenge:
      "Creative work rarely moves in a straight line, but most project tools assume it does. Teams needed structure that supported their process instead of prescribing it.",
    solution:
      "I created a flexible workspace with visual boards, contextual conversations, and just enough project structure. A modular design system keeps the experience consistent as teams scale.",
    result:
      "A unified workspace concept built around the way creative teams actually think and work.",
  },
  {
    id: "forma",
    title: "Forma",
    subtitle: "An independent studio. An expressive new home.",
    category: "Websites",
    tags: ["Art direction", "Web design"],
    year: "2024",
    kind: "studio",
    role: "Art direction & web design",
    focus: "An expressive studio presence",
    deliverables: "Website concept, responsive layouts, identity",
    decisions: [
      [
        "Let the work breathe",
        "Build an editorial grid with generous space so the projects remain the focus.",
      ],
      [
        "Make personality useful",
        "Pair expressive typography with a restrained navigation system that keeps exploring effortless.",
      ],
      [
        "Carry the idea across screens",
        "Adapt the hierarchy and pacing for small screens rather than simply shrinking the desktop layout.",
      ],
    ],
    description:
      "A bold digital identity for an independent architecture practice. An expressive editorial website that gives their spaces, process, and point of view room to breathe.",
    challenge:
      "The studio’s existing site showed the work but not the thinking behind it. They needed a digital home that felt as distinctive as the spaces they create.",
    solution:
      "Confident typography, an unexpected blue, and a flexible editorial grid bring personality to the studio’s portfolio. The navigation stays quiet, allowing the work to lead.",
    result:
      "A responsive website concept that balances architectural precision with a genuinely human personality.",
  },
];
export type Project = (typeof projects)[number];
const mountain = "/images/dolomites.jpg";
const email = "hello@sooyoo.design";
const contactOptions = {
  hiring: {
    label: "I’m hiring",
    title: "Let’s find our next good fit.",
    description:
      "Tell me about your team, the role, and the product challenges you’re working on. I’d love to hear where thoughtful design could make a difference.",
    action: "Let’s talk about the role",
    subject: "A product design opportunity",
    body: "Hi Soo,\n\nI’d love to talk about a product design role.\n\nCompany:\nRole:\nLocation / working setup:\nA little about the team:\n\nThanks!",
  },
  project: {
    label: "I have a project",
    title: "Good ideas deserve a good partner.",
    description:
      "A new product, a better website, or something that needs untangling? Share a little about your idea, your timeline, and where you’d like a hand.",
    action: "Tell me about your project",
    subject: "Let’s make something good",
    body: "Hi Soo,\n\nI have a project I’d love to explore with you.\n\nA little about the project:\nWhat I need help with:\nIdeal timeline:\nBudget range:\n\nThanks!",
  },
};
type ContactIntent = keyof typeof contactOptions;
function contactHref(intent: ContactIntent) {
  const option = contactOptions[intent];
  return `mailto:${email}?subject=${encodeURIComponent(option.subject)}&body=${encodeURIComponent(option.body)}`;
}

function FinanceMockup() {
  return (
    <div className="finance-window">
      <aside className="finance-side">
        <b className="folio-logo">
          f<span>olio</span>
        </b>
        <small>YOUR WORKSPACE</small>
        <div className="side-active">◈ &nbsp; Overview</div>
        <div>▤ &nbsp; Transactions</div>
        <div>◷ &nbsp; Accounts</div>
        <div>◇ &nbsp; Savings goals</div>
        <div className="side-bottom">
          <span className="tiny-avatar">J</span> Jamie Morgan
        </div>
      </aside>
      <div className="finance-main">
        <div className="mock-top">
          <span>Overview</span>
          <span>⌕ &nbsp; ⊕</span>
        </div>
        <h4>A little more peace of mind.</h4>
        <p>Here’s how your money is doing today.</p>
        <div className="balance">
          <small>
            Total balance <span>↗ 8.2%</span>
          </small>
          <strong>
            $24,680<span>.00</span>
          </strong>
          <div className="chart">
            <svg viewBox="0 0 330 75" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#afa9f5" stopOpacity=".4" />
                  <stop offset="1" stopColor="#afa9f5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 65 30 58 55 61 79 40 105 45 130 32 150 38 180 21 205 29 225 16 250 20 275 7 305 13 330 0V75H0Z"
                fill="url(#chartFill)"
              />
              <path
                d="m0 65 30-7 25 3 24-21 26 5 25-13 20 6 30-17 25 8 20-13 25 4 25-13 30 6 25-13"
                stroke="#8b80e3"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
          </div>
          <div className="chart-dates">
            <span>May 1</span>
            <span>May 7</span>
            <span>May 14</span>
            <span>May 21</span>
            <span>May 28</span>
          </div>
        </div>
        <div className="finance-bottom">
          <div>
            <small>Monthly spending</small>
            <strong>$3,240.80</strong>
            <div className="spend-bars">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span>Looking good. A little under budget.</span>
          </div>
          <div>
            <small>Your savings goals</small>
            <div className="goal">
              ↗{" "}
              <span>
                Summer in Italy<small>$2,450 of $4,000</small>
              </span>
              <b>61%</b>
            </div>
            <div className="goal-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
function TravelMockup() {
  return (
    <>
      <div className="travel-wordmark">
        roam<span>Go a little further.</span>
      </div>
      <div className="travel-orbit" />
      <div className="phone phone-back">
        <div className="phone-status">
          9:41 <span>▮ ▰</span>
        </div>
        <div className="phone-photo" style={{ backgroundImage: `url(${mountain})` }}>
          <span className="phone-back-arrow">‹</span>
          <span className="photo-heart">♡</span>
          <div>
            <small>THE DOLOMITES, ITALY</small>
            <h4>
              Find your
              <br />
              kind of far away.
            </h4>
          </div>
        </div>
        <div className="trip-info">
          <b>A little closer to the wild.</b>
          <p>Alpine air. Quiet trails. Endless possibility.</p>
          <div>
            4.9 <span>· 124 explorer reviews</span>
          </div>
          <span className="trip-cta">Explore this place ↗</span>
        </div>
      </div>
      <div className="phone phone-front">
        <div className="phone-status">
          9:41 <span>▮ ▰</span>
        </div>
        <div className="travel-greeting">
          <span>GOOD MORNING, SOO</span>
          <div>
            Your next
            <br />
            chapter starts here<span>✳</span>
          </div>
        </div>
        <div className="travel-search">⌕ &nbsp; Where will you go?</div>
        <div className="travel-chips">
          <b>For you</b>
          <span>Outdoors</span>
          <span>Slow living</span>
        </div>
        <div className="destination-image" style={{ backgroundImage: `url(${mountain})` }}>
          <span>♡</span>
          <div>
            <small>ITALY</small>
            <b>The Dolomites</b>
            <p>A breath of fresh perspective.</p>
          </div>
        </div>
        <div className="phone-nav">
          <b>⌂</b>
          <span>⌕</span>
          <span>♡</span>
          <span>◉</span>
        </div>
      </div>
      <span className="travel-caption">
        Less itinerary.
        <br />
        More possibility.
      </span>
    </>
  );
}
function WorkspaceMockup() {
  return (
    <div className="canvas-window">
      <div className="canvas-sidebar">
        <b>◈ canvas</b>
        <div>⌕ &nbsp; Search anything</div>
        <div>⌂ &nbsp; Home</div>
        <div>◷ &nbsp; My work</div>
        <small>YOUR WORKSPACE &nbsp; +</small>
        <div className="canvas-selected">◧ &nbsp; Brand refresh</div>
        <div>▧ &nbsp; Website launch</div>
        <div>▨ &nbsp; The idea garden</div>
        <div className="canvas-team">● ● ● &nbsp; Your team</div>
      </div>
      <div className="canvas-main">
        <div className="canvas-breadcrumb">
          Workspace &nbsp; / &nbsp; Brand refresh <span>↗ &nbsp; •••</span>
        </div>
        <div className="canvas-title">
          <h4>Good things start here.</h4>
          <p>A fresh perspective. A shared direction. Let’s make it happen.</p>
        </div>
        <div className="board-tabs">
          <b>◧ &nbsp; Board</b>
          <span>☷ &nbsp; List</span>
          <span>▦ &nbsp; Timeline</span>
          <i>Filter &nbsp; + New task</i>
        </div>
        <div className="kanban">
          {["To explore", "In the making", "Ready to share"].map((column, index) => (
            <div className="kanban-column" key={column}>
              <div className="column-label">
                <i className={`dot dot-${index}`} />
                {column}
                <span>3 &nbsp; +</span>
              </div>
              {[0, 1, 2].map((item) => (
                <div className="kanban-task" key={item}>
                  {item === 0 && (
                    <div className={`task-image task-image-${index}`}>
                      {index === 0 ? "Aa" : index === 1 ? <Flower /> : "Make room for better."}
                    </div>
                  )}
                  <small>{["EXPLORATION", "DESIGN", "STRATEGY"][index]}</small>
                  <b>
                    {
                      [
                        ["A new point of view", "Collecting inspiration", "What makes us, us?"],
                        ["Visual identity explorations", "Finding our voice", "The details matter"],
                        [
                          "Brand foundations",
                          "Our story, reimagined",
                          "Ready for the next chapter",
                        ],
                      ][index][item]
                    }
                  </b>
                  <div className="task-footer">
                    <span>☷ &nbsp; 2</span>
                    <i>{["JD", "MK", "AL"][item]}</i>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function StudioMockup() {
  return (
    <div className="studio-window">
      <div className="studio-nav">
        <b>forma®</b>
        <span>Independent by design.</span>
        <span>Work &nbsp; Studio &nbsp; Contact ↗</span>
      </div>
      <div className="studio-headline">
        Spaces for
        <br />a different <i>everyday.</i>
        <span>↘</span>
      </div>
      <div className="studio-bottom">
        <span>
          Architecture, interiors,
          <br />
          and everything in between.
        </span>
        <div className="architecture">
          <div className="arch-wall" />
          <div className="arch-circle" />
          <div className="arch-shadow" />
          <span>01 — THE QUIET HOUSE</span>
        </div>
      </div>
      <div className="studio-foot">
        <span>Thoughtfully made. Honestly felt.</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </div>
  );
}
export function ProjectVisual({ kind }: { kind: string }) {
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      {kind === "finance" ? (
        <FinanceMockup />
      ) : kind === "travel" ? (
        <TravelMockup />
      ) : kind === "workspace" ? (
        <WorkspaceMockup />
      ) : (
        <StudioMockup />
      )}
      <div className="view-project">
        View case study <Arrow size={17} />
      </div>
    </div>
  );
}

function DraggableSticker({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const stickerRef = useRef<HTMLDivElement>(null);
  const start = useRef<{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    bounds: { minX: number; maxX: number; minY: number; maxY: number };
  } | null>(null);

  function getHeroBounds(element: HTMLDivElement, current: { x: number; y: number }) {
    const hero = element.closest<HTMLElement>(".hero");
    if (!hero) return null;
    const heroRect = hero.getBoundingClientRect();
    const stickerRect = element.getBoundingClientRect();
    return {
      minX: current.x + heroRect.left - stickerRect.left,
      maxX: current.x + heroRect.right - stickerRect.right,
      minY: current.y + heroRect.top - stickerRect.top,
      maxY: current.y + heroRect.bottom - stickerRect.bottom,
    };
  }

  function clampToHero(
    next: { x: number; y: number },
    bounds: { minX: number; maxX: number; minY: number; maxY: number },
  ) {
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, next.x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, next.y)),
    };
  }

  return (
    <div
      ref={stickerRef}
      className={`draggable-sticker ${className}`}
      style={{ translate: `${position.x}px ${position.y}px` }}
      tabIndex={0}
      role="group"
      aria-label="Movable sticker. Use arrow keys to move, or Home to reset."
      onKeyDown={(event) => {
        const directions: Record<string, [number, number]> = {
          ArrowLeft: [-10, 0],
          ArrowRight: [10, 0],
          ArrowUp: [0, -10],
          ArrowDown: [0, 10],
        };
        if (event.key === "Home") {
          event.preventDefault();
          setPosition({ x: 0, y: 0 });
        } else if (directions[event.key]) {
          event.preventDefault();
          const [x, y] = directions[event.key];
          setPosition((previous) => {
            const bounds = stickerRef.current ? getHeroBounds(stickerRef.current, previous) : null;
            const next = { x: previous.x + x, y: previous.y + y };
            return bounds ? clampToHero(next, bounds) : next;
          });
        }
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        const bounds = getHeroBounds(event.currentTarget, position);
        if (!bounds) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        start.current = {
          x: event.clientX,
          y: event.clientY,
          offsetX: position.x,
          offsetY: position.y,
          bounds,
        };
      }}
      onPointerMove={(event) => {
        if (!start.current) return;
        setPosition(
          clampToHero(
            {
              x: start.current.offsetX + event.clientX - start.current.x,
              y: start.current.offsetY + event.clientY - start.current.y,
            },
            start.current.bounds,
          ),
        );
      }}
      onPointerUp={() => {
        start.current = null;
      }}
      onPointerCancel={() => {
        start.current = null;
      }}
      onLostPointerCapture={() => {
        start.current = null;
      }}
      onDoubleClick={() => setPosition({ x: 0, y: 0 })}
      title="Drag to move. Double-click to reset."
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const filter =
    searchParams.get("type") === "products"
      ? "Digital products"
      : searchParams.get("type") === "websites"
        ? "Websites"
        : "All work";
  const [storyOpen, setStoryOpen] = useState(false);
  const [service, setService] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [contactIntent, setContactIntent] = useState<ContactIntent>("project");
  const copyTimer = useRef<number | undefined>(undefined);
  const contact = contactOptions[contactIntent];
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return (
    <>
      <section className="hero">
        <div className="hero-topline">
          <div className="availability">
            <i /> Open to roles & freelance projects
          </div>
        </div>
        <span className="handwritten hero-note">a little curiosity goes a long way ↘</span>
        <h1>
          <span className="hero-line hero-line-first">
            Design with{" "}
            <em
              style={{
                background: "#f5fa83",
                color: "var(--ink)",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              taste,
            </em>
          </span>
          <br />
          <span className="hero-line hero-line-second">
            shipped with care
            <span className="coral-period">.</span>
          </span>
        </h1>
        <div className="hero-summary">
          <p>
            <span>
              I’m Soo — a senior product designer with seven years across consumer, B2B, and the
              strange new edges of AI. Before pixels, kitchens: I spent years as a chef, and I still
              bake on weekends. Both jobs taught me the same thing — the difference between fine and
              unforgettable is restraint, timing, and giving a damn.
            </span>
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">
              View selected work <Arrow size={16} />
            </a>
            <a className="text-action" href="#collaborate">
              Work with me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <DraggableSticker className="human-sticker">
          <span>LESS ARTIFICIAL.</span>
          <strong>
            More
            <br />
            <em>human.</em>
          </strong>
          <span>THAT’S THE IDEA.</span>
        </DraggableSticker>
        <DraggableSticker className="reminder-sticker">
          <span className="tape" />
          <span className="handwritten">note to self:</span>
          <strong>
            trust the
            <br />
            process.
          </strong>
          <span className="handwritten">good things take a little time</span>
        </DraggableSticker>
        <div className="hero-bottom">
          <a href="#work" className="explore-link" hidden>
            Scroll to explore <span>↓</span>
          </a>
          <span className="handwritten drag-hint">↔ psst… the stickers move</span>
        </div>
      </section>
      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <span className="eyebrow work-heading-note">
              the thinking, not just the pixels—strategy, craft & a little personality
            </span>
            <h2>
              Selected <em>work</em>
              <span className="work-count">(04)</span>
            </h2>
          </div>
          <div className="filters" aria-label="Filter projects">
            {["All work", "Digital products", "Websites"].map((item) => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  if (item === "All work") next.delete("type");
                  else next.set("type", item === "Websites" ? "websites" : "products");
                  setSearchParams(next, { replace: true, preventScrollReset: true });
                }}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid" aria-live="polite">
          {projects
            .filter((p) => filter === "All work" || p.category === filter)
            .map((project) => (
              <Link
                className="project-card"
                key={project.id}
                to={`/work/${project.id}`}
                state={{ from: `${location.pathname}${location.search}#work` }}
                aria-label={`View ${project.title} case study`}
              >
                <div className="project-open">
                  <ProjectVisual kind={project.kind} />
                  <span className="concept-label">Independent concept</span>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-category">
                      {project.category} / {project.year}
                    </span>
                    <h3 className="project-title">
                      {project.title}
                      <Arrow size={21} />
                    </h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <span className="project-arrow" aria-hidden="true">
                    <Arrow size={23} />
                  </span>
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section
        className="about-section about-section-combined"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="about-editorial-heading">
          <h2 id="about-title">
            <span>To turn ideas into</span>
            <span>
              <em>sensible</em>
            </span>
            <span>
              <em>experiences</em>
            </span>
          </h2>
          <a
            className="about-resume handwritten"
            href={`mailto:${email}?subject=${encodeURIComponent("I'd love to see your résumé")}`}
            aria-label="Request Soo’s résumé by email"
          >
            Resume <Arrow size={24} />
          </a>
        </div>
        <div className="about-editorial-body">
          <p className="about-story-intro">
            I used to <em>cook</em> for a living.
            <br />
            Turns out the <em>jobs are the same.</em>
          </p>
          <div className="about-copy">
            {storyOpen && (
              <div className="expanded-story" id="about-expanded-story">
                <p>
                  I’m Soo, an independent product designer based in Brooklyn, working with good
                  people everywhere.
                </p>
                <p>
                  I help product teams and founders turn complex problems into simple, human digital
                  experiences—from research and direction to flows and interfaces.
                </p>
                <p>
                  I bring a thoughtful point of view and a hands-on approach to every stage, making
                  digital things that feel as good as they work.
                </p>
              </div>
            )}
            <p>
              Six years in professional kitchens — line cook, pastry, sous chef, eventually running
              my own popup. Then I switched careers and learned a secret:{" "}
              <strong>designing software is just a slower, quieter mise en place.</strong> You scope
              the menu, you prep your stations, you cook in the order that keeps everything hot, and
              you taste constantly. Same discipline, different tools.
            </p>
            <button
              className="story-button"
              onClick={() => setStoryOpen(!storyOpen)}
              aria-expanded={storyOpen}
              aria-controls={storyOpen ? "about-expanded-story" : undefined}
            >
              {storyOpen ? "A little less about me" : "Read my story"}{" "}
              <span>{storyOpen ? "−" : "+"}</span>
            </button>
          </div>
          <figure className="about-photo-card">
            <img
              src="/images/soo-about.jpg"
              alt="Soo smiling while camping in a wooded setting"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
      <section className="services-section" id="services">
        <div>
          <span className="eyebrow">HOW I CAN HELP</span>
          <h2>
            Good thinking.
            <br />
            <em>Better together.</em>
          </h2>
          <p>
            From a spark of an idea to something
            <br />
            people love to use.
          </p>
        </div>
        <div className="service-list">
          {[
            [
              "Product design",
              "Research, user journeys, wireframes, and high-fidelity interfaces. Thoughtful, end-to-end digital experiences shaped around real people.",
            ],
            [
              "Web design",
              "Distinctive, responsive websites that balance personality with purpose—from the first impression to the last interaction.",
            ],
            [
              "Design systems",
              "Flexible foundations and reusable components that make a product feel consistent and help teams move with confidence.",
            ],
            [
              "Creative partnership",
              "An extra pair of hands and a fresh perspective. Let’s untangle a tricky problem, explore an idea, or make something unexpected.",
            ],
          ].map(([title, description], index) => (
            <div className={`service-item ${service === index ? "expanded" : ""}`} key={title}>
              <button
                aria-expanded={service === index}
                aria-controls={`service-${index}`}
                onClick={() => setService(service === index ? null : index)}
              >
                <span className="service-number">0{index + 1}</span>
                <span>{title}</span>
                <span className="service-toggle">{service === index ? "−" : "+"}</span>
              </button>
              <div id={`service-${index}`} hidden={service !== index}>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="collaborate-section" id="collaborate" aria-labelledby="collaborate-title">
        <div className="collaborate-heading">
          <div>
            <span className="eyebrow">TWO WAYS TO MAKE GOOD THINGS</span>
            <h2 id="collaborate-title">
              Different beginnings. <em>Shared ambition.</em>
            </h2>
          </div>
          <span className="handwritten">the best work starts with a conversation ↙</span>
        </div>
        <div className="collaboration-grid">
          <article className="collaboration-card hiring-card">
            <div className="collaboration-top">
              <span className="eyebrow">01 / FOR HIRING TEAMS</span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <circle cx="12" cy="10" r="4" />
                <path d="M4 27v-3a8 8 0 0 1 16 0v3M22 6a4 4 0 0 1 0 8M24 18a7 7 0 0 1 4 6v3" />
              </svg>
            </div>
            <h3>
              A thoughtful addition
              <br />
              to your team.
            </h3>
            <p>
              Looking for a designer who asks good questions, connects the dots, and cares about the
              details? Let’s explore what we could build together.
            </p>
            <ul>
              <li>End-to-end product thinking</li>
              <li>Close partnership with product & engineering</li>
              <li>Craft, curiosity, and a collaborative mindset</li>
            </ul>
            <a href="#contact" onClick={() => setContactIntent("hiring")}>
              Let’s talk about your team <Arrow size={18} />
            </a>
          </article>
          <article className="collaboration-card freelance-card">
            <div className="collaboration-top">
              <span className="eyebrow">02 / FOR FOUNDERS & BUSINESSES</span>
              <Flower />
            </div>
            <h3>
              A design partner for
              <br />
              your next chapter.
            </h3>
            <p>
              From an early-stage idea to a product ready for its next step, I bring fresh
              perspective and hands-on design to move things forward.
            </p>
            <ul>
              <li>New products & MVP experiences</li>
              <li>Websites with personality and purpose</li>
              <li>Product refinement & design systems</li>
            </ul>
            <a href="#contact" onClick={() => setContactIntent("project")}>
              Let’s talk about your project <Arrow size={18} />
            </a>
          </article>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="contact-top">
          <span className="eyebrow">HAVE A GOOD “WHAT IF”?</span>
          <span className="availability">
            <i /> Roles, projects & good conversations
          </span>
        </div>
        <a className="contact-title" href={contactHref(contactIntent)}>
          Let’s make
          <br />
          something <i>good.</i>
          <Arrow />
        </a>
        <div className="contact-bottom">
          <div className="contact-brief">
            <div className="contact-tabs" role="group" aria-label="What brings you here?">
              {(Object.keys(contactOptions) as ContactIntent[]).map((intent) => (
                <button
                  key={intent}
                  aria-pressed={contactIntent === intent}
                  onClick={() => setContactIntent(intent)}
                >
                  {contactOptions[intent].label}
                </button>
              ))}
            </div>
            <div className="contact-intent" aria-live="polite">
              <h3>{contact.title}</h3>
              <p>{contact.description}</p>
              <a className="contact-start" href={contactHref(contactIntent)}>
                {contact.action} <Arrow size={17} />
              </a>
            </div>
          </div>
          <div className="contact-direct">
            <span className="eyebrow">OR, KEEP IT SIMPLE</span>
            <button className="email-button" onClick={copyEmail}>
              {copied ? "Email copied to clipboard" : email}
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V4H4v12h4" />
              </svg>
            </button>
            <span className="contact-copy-hint">Click to copy. Say hello when you’re ready.</span>
            <span className="handwritten">Looking forward to what’s next.</span>
          </div>
        </div>
        <span className="sr-only" role="status">
          {copied ? "Email address copied" : ""}
        </span>
      </section>
    </>
  );
}
