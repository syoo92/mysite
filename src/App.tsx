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
    id: "sapphire",
    title: "Sapphire",
    subtitle: "A premium refresh, from first login to everyday moments.",
    category: "Digital products",
    tags: ["Experience strategy", "UX / UI design"],
    year: "2025",
    kind: "sapphire",
    role: "Digital experience design",
    focus: "Card refresh across app and web",
    deliverables: "CX framework, journey maps, final app assets",
    decisions: [
      [
        "A framework built for experience",
        "We kept the agency messaging framework’s high-level pillars, then built out the lower levels so they applied directly to the customer experience.",
      ],
      [
        "Meet customers in their moments",
        "End-to-end journey maps showed when, where, and how the product shows up in people’s lives, and where the key messages should land.",
      ],
      [
        "Premium, used with restraint",
        "Full-screen takeovers only for onboarding, carousels kept to five tiles, and photography chosen for each destination.",
      ],
    ],
    description:
      "The Sapphire Reserve card refresh brought a more premium, photo-led experience to the Chase app and web, from a new warm welcome to the everyday account screens.",
    challenge:
      "A card refresh touches every digital moment, from the first login to a quick balance check. The challenge was turning an agency messaging framework and new brand guidelines into an experience customers would actually feel.",
    solution:
      "We built a customer-experience framework out of the messaging pillars, mapped the end-to-end journey to find the moments that matter, and used the brand and photography guidelines to rebuild the key screens.",
    result:
      "A unified refresh across app and web: a photo-led Warm Welcome, a new benefits carousel, rebranded merchandising tiles, one Blue800 interaction color, and quick actions in the upcoming product design language.",
    client: true,
  },
  {
    id: "buying-power",
    title: "Buying Power",
    subtitle: "Showing current clients what they can afford, before they apply.",
    category: "Digital products",
    tags: ["UX research", "Product design"],
    year: "2022",
    kind: "buyingpower",
    role: "Product design, with a team of five",
    focus: "A proactive home-buying estimate for Rocket clients",
    deliverables: "Scenario maps, usability tests, hi-fi designs, MVP requirements",
    decisions: [
      [
        "Fewer steps boost adoption",
        "A single-page confirmation gets people to their updated number with as few interactions as possible.",
      ],
      [
        "Show the factors to build trust",
        "A visual breakdown of what feeds into the number sits right next to it.",
      ],
      [
        "Homes in range drive the next step",
        "Searching for homes at the Buying Power price is kept close, in line with the Buy / Sell work.",
      ],
    ],
    description:
      "Proactive Buying Power gives current Rocket clients an estimate of what they can afford for their next home, based on their soft credit data, without making them apply for a mortgage.",
    challenge:
      "Clients already in the Rocket ecosystem had no accurate way to see their options for a next loan without starting a mortgage application.",
    solution:
      "We built the experience around a client story, mapped what happens with and without client data, and tested two ways to confirm information before showing an updated number.",
    result:
      "Hi-fi designs and MVP requirements for a login takeover, a Buying Power result and a dashboard card, timed to fit with the upcoming Buy / Sell experience.",
    client: true,
  },
  {
    id: "offers-playbook",
    title: "Offers Playbook",
    subtitle: "Personalized offers, built from one shared playbook.",
    category: "Digital products",
    tags: ["Design systems", "UX / UI design"],
    year: "2022",
    kind: "playbook",
    role: "UX / UI design, with a team of five",
    focus: "The offers page in Rocket Mortgage Servicing",
    deliverables: "Value matrix, offers playbook, prototype test, UX patterns",
    decisions: [
      [
        "Make it easy to find the right offer",
        "New sections appear based on each client’s selections, with advanced settings collapsed by default.",
      ],
      [
        "Build from what exists",
        "Offer cards, pills and layouts come from Rocket’s new design system.",
      ],
      [
        "Design for where it’s going",
        "Audience segmentation and a dynamic page, launched in phases.",
      ],
    ],
    description:
      "A redesign of the offers page in Rocket Mortgage Servicing, plus a playbook that helps teams deliver personalized offers at the right moments, with less design time.",
    challenge:
      "Every client saw the same offers, the page had no clear hierarchy, and each new offer needed custom design work.",
    solution:
      "We defined what makes an offer valuable, built a playbook with the design systems team, and tested new page layouts with ten participants.",
    result:
      "A simpler offers page with condensed cards and reusable patterns, launched in phases, and a playbook that streamlines future offers.",
    client: true,
  },
  {
    id: "soft-credit",
    title: "Soft Credit",
    subtitle: "Helping clients understand their credit, and what to do next.",
    category: "Digital products",
    tags: ["UX research", "Product design"],
    year: "2022",
    kind: "softcredit",
    role: "Product design, with a team of five",
    focus: "Credit monitoring for Rocket Mortgage clients",
    deliverables: "Research synthesis, user test, consent flow, dashboard designs",
    decisions: [
      [
        "Set expectations up front",
        "Plain-language copy explains a soft credit check and what happens next.",
      ],
      ["Show exactly where a score sits", "A precise indicator on the credit score meter."],
      ["Help, don’t just report", "Lower scores come with what they mean and how to raise them."],
    ],
    description:
      "The Soft Credit Experience gives Rocket Mortgage clients their credit score on their dashboard, what it means for a mortgage, and how to improve it.",
    challenge:
      "Serviced clients rarely visited their accounts, and many people overestimate their credit or don’t know what a good score is.",
    solution:
      "We turned research on credit misconceptions into a consent-to-score flow, tested it, and rewrote copy and visuals where people got stuck.",
    result:
      "Soft credit monitoring launched across all Rocket platforms within three months, from the consent form to prefilled data.",
    client: true,
  },
];
export type Project = (typeof projects)[number];
const email = "ysyoo92@gmail.com";
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

// The contact section that ends every page: "Let's make something good.", the hiring/project tabs and
// the email. The home page controls which tab is chosen (its "Work with me" cards preselect one);
// elsewhere the section keeps its own choice.
export function ContactSection({
  intent,
  onIntentChange,
  compact = false,
}: {
  intent?: ContactIntent;
  onIntentChange?: (intent: ContactIntent) => void;
  /** Project pages: just the heading and a "Let's talk" button (from the Figma design). */
  compact?: boolean;
}) {
  const [ownIntent, setOwnIntent] = useState<ContactIntent>("project");
  const contactIntent = intent ?? ownIntent;
  const setContactIntent = onIntentChange ?? setOwnIntent;
  const [copied, setCopied] = useState(false);
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
  if (compact) {
    return (
      <section className="contact-section contact-section-compact" id="contact">
        <div className="contact-top">
          <span className="eyebrow">HAVE A GOOD “WHAT IF”?</span>
        </div>
        <a className="contact-title" href={contactHref(contactIntent)}>
          Let’s make
          <br />
          something <em>good.</em>
        </a>
        <Link className="primary-action" to="/#contact">
          Let’s talk <Arrow size={17} />
        </Link>
      </section>
    );
  }
  return (
    <section className="contact-section" id="contact">
      <div className="contact-top">
        <span className="eyebrow">HAVE A GOOD “WHAT IF”?</span>
      </div>
      <a className="contact-title" href={contactHref(contactIntent)}>
        Let’s make
        <br />
        something <em>good.</em>
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
  );
}

// Client thumbnails: three phones showing real prototype screens. The middle phone cycles
// through a few screens and the phones drift gently (still for reduced motion).
const thumbScreens: Record<
  string,
  { left: string; center: string[]; right: string; label: string }
> = {
  sapphire: {
    left: "/images/thumb-sapphire-credits.avif",
    center: [
      "/images/thumb-sapphire-welcome.avif",
      "/images/thumb-sapphire-wallet.avif",
      "/images/thumb-sapphire-benefit.avif",
    ],
    right: "/images/thumb-sapphire-account.avif",
    label: "Sapphire",
  },
  buyingpower: {
    left: "/images/thumb-buyingpower-takeover.avif",
    center: [
      "/images/thumb-buyingpower-result.avif",
      "/images/thumb-buyingpower-homes.avif",
      "/images/thumb-buyingpower-confirm.avif",
    ],
    right: "/images/thumb-buyingpower-dashboard.avif",
    label: "Buying Power",
  },
};

// Desktop work gets the same treatment in a browser window: the page itself, plus a
// floating card that cycles through two details.
const thumbBrowsers: Record<string, { main: string; float: string[]; floatRatio: string }> = {
  softcredit: {
    main: "/images/softcredit-dashboard.avif",
    float: ["/images/thumb-softcredit-650.avif", "/images/thumb-softcredit-500.avif"],
    floatRatio: "275 / 568",
  },
  playbook: {
    main: "/images/thumb-playbook-offers.avif",
    float: ["/images/thumb-playbook-about.avif", "/images/thumb-playbook-segments.avif"],
    floatRatio: "576 / 403",
  },
};

function ThumbBrowser({ kind }: { kind: string }) {
  const thumb = thumbBrowsers[kind];
  if (!thumb) return null;
  return (
    <div className={`thumb-stage thumb-stage-browser thumb-browser-${kind}`}>
      <div className="thumb-browser">
        <div className="thumb-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <img src={thumb.main} alt="" loading="lazy" />
      </div>
      <div className="thumb-float" style={{ aspectRatio: thumb.floatRatio }}>
        {thumb.float.map((src, index) => (
          <img
            key={src}
            className="thumb-cycle-2"
            style={{ animationDelay: `${index * 3}s` }}
            src={src}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

function ThumbPhones({ kind }: { kind: string }) {
  const screens = thumbScreens[kind];
  if (!screens) return <ThumbBrowser kind={kind} />;
  return (
    <div className="thumb-stage">
      <div className="thumb-phone thumb-phone-left">
        <img src={screens.left} alt="" loading="lazy" />
      </div>
      <div className="thumb-phone thumb-phone-center">
        {screens.center.map((src, index) => (
          <img
            key={src}
            className="thumb-cycle"
            style={{ animationDelay: `${index * 3}s` }}
            src={src}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
      <div className="thumb-phone thumb-phone-right">
        <img src={screens.right} alt="" loading="lazy" />
      </div>
    </div>
  );
}

export function ProjectVisual({ kind }: { kind: string }) {
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <ThumbPhones kind={kind} />
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
  const [dragging, setDragging] = useState(false);
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

  // Keep a moved sticker inside the hero when the window resizes or the phone rotates.
  useEffect(() => {
    const element = stickerRef.current;
    const hero = element?.closest<HTMLElement>(".hero");
    if (!element || !hero) return;
    const observer = new ResizeObserver(() => {
      setPosition((previous) => {
        if (previous.x === 0 && previous.y === 0) return previous;
        const bounds = getHeroBounds(element, previous);
        if (!bounds) return previous;
        const next = clampToHero(previous, bounds);
        return next.x === previous.x && next.y === previous.y ? previous : next;
      });
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stickerRef}
      className={`draggable-sticker ${className}${dragging ? " is-dragging" : ""}`}
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
        setDragging(true);
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
        setDragging(false);
      }}
      onPointerCancel={() => {
        start.current = null;
        setDragging(false);
      }}
      onLostPointerCapture={() => {
        start.current = null;
        setDragging(false);
      }}
      onDoubleClick={() => setPosition({ x: 0, y: 0 })}
      title="Drag to move. Double-click to reset."
    >
      {children}
    </div>
  );
}

const resumeUrl = "https://drive.google.com/file/d/174UXiH2p4Kkdq3xNcPY_6u7_QtpILzR9/view";
("https://drive.google.com/file/d/174UXiH2p4Kkdq3xNcPY_6u7_QtpILzR9/preview");

const resumeRoles: {
  company: string;
  dates: string;
  title: string;
  points: string[];
}[] = [
  {
    company: "JPMorgan Chase",
    dates: "Nov ’24 — Present",
    title: "Product Designer · Affluent Card",
    points: [
      "Led and designed the Chase Sapphire Preferred card refresh experience.",
      "Led design strategy for the Chase Sapphire Reserve card refresh, elevating the in-app experience for a premium target audience.",
      "Streamlined future card-refresh processes around product-audience segments powered by AI-assisted tools.",
    ],
  },
  {
    company: "JPMorgan Chase",
    dates: "Aug ’23 — Nov ’24",
    title: "Product Designer · Platform Team",
    points: [
      "Led the creation of a messaging design system for the consumer digital banking platform, serving over 53 million users.",
      "Designed modular components and strategy that consolidated and simplified the messaging experience end to end.",
      "Built interactive prototypes and led usability testing with stakeholders and collaborators.",
    ],
  },
  {
    company: "Rocket Mortgage",
    dates: "Nov ’22 — Aug ’23",
    title: "Mobile Product Designer",
    points: [
      "Designed the document-management experience for 15 million users.",
      "Defined the design capabilities and resources needed to build a stronger documentation ecosystem for cross-app users across Rocket Mortgage.",
    ],
  },
  {
    company: "Rocket Mortgage",
    dates: "Jun ’22 — Nov ’22",
    title: "Mid-Associate Product Designer",
    points: [
      "Designed future-vision products driving personalization and dashboard customization on the Rocket Mortgage platform.",
      "Led the design retention strategy for existing users and folded qualitative research findings into new designs.",
    ],
  },
];
const resumeEarlyRoles = [
  { title: "Junior Product Designer", dates: "Aug ’21 — Jun ’22" },
  { title: "Product Design Intern", dates: "Nov ’20 — Aug ’21" },
];
const resumeSoftware = [
  "Figma",
  "Sketch",
  "Framer",
  "Webflow",
  "VS Code",
  "AI tools",
  "HTML/CSS",
  "Zeplin",
  "Adobe CS",
  "User testing",
];
const resumeSkills = [
  "Product design",
  "User research",
  "Cognitive walkthroughs",
  "Rapid prototyping",
  "Interaction design",
  "Motion graphics",
  "Design strategy",
  "Layout design",
  "Storytelling",
  "Vibe code",
];

function ResumeDocument() {
  return (
    <article className="resume-doc">
      <header className="resume-doc-header">
        <div>
          <p className="resume-doc-name">Soo Yeon Yoo</p>
          <p className="resume-doc-role">
            <strong>Senior Product Designer</strong>
            <span className="handwritten">Designed with taste, shipped with care.</span>
          </p>
        </div>
        <ul className="resume-doc-contact">
          <li>sooyeonyoo.co</li>
          <li>{email}</li>
          <li>linkedin.com/in/ysyoo92</li>
        </ul>
      </header>
      <div className="resume-doc-columns">
        <aside className="resume-doc-side">
          <section>
            <h3>Education</h3>
            <p className="resume-doc-strong">City College of New York</p>
            <p>B.Sc Arts & Design</p>
            <p>Class of ’20</p>
          </section>
          <section>
            <h3>Software</h3>
            <ul className="resume-doc-chips">
              {resumeSoftware.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Skills</h3>
            <ul className="resume-doc-skills">
              {resumeSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
        <section className="resume-doc-experience">
          <h3>Experience</h3>
          {resumeRoles.map((role) => (
            <div className="resume-doc-job" key={role.title}>
              <div className="resume-doc-company">
                <p className="resume-doc-strong">{role.company}</p>
                <p>{role.dates}</p>
              </div>
              <div>
                <p className="resume-doc-title">{role.title}</p>
                <ul className="resume-doc-points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="resume-doc-job">
            <div className="resume-doc-company">
              <p className="resume-doc-strong">Rocket Mortgage</p>
              <p>Nov ’20 — Jun ’22</p>
            </div>
            <ul className="resume-doc-early">
              {resumeEarlyRoles.map((role) => (
                <li key={role.title}>
                  <span className="resume-doc-title">{role.title}</span>
                  <span>{role.dates}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}

// The Resume link opens the résumé in a scrollable window on the same page. The résumé is
// written out as text (from Soo's PDF), so it reflows to one column on phones and shows
// everywhere, including the published artifact.
function ResumeLink() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();
  return (
    <>
      <a
        className="about-resume handwritten"
        href={resumeUrl}
        onClick={(event) => {
          event.preventDefault();
          dialogRef.current?.showModal();
        }}
        aria-haspopup="dialog"
      >
        Resume <Arrow size={24} />
      </a>
      <dialog
        ref={dialogRef}
        className="resume-modal"
        aria-labelledby="resume-modal-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="resume-modal-header">
          <h2 id="resume-modal-title">Résumé</h2>
          <div className="resume-modal-actions">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              Open in new tab <Arrow size={16} />
            </a>
            <button type="button" className="resume-modal-close" onClick={close}>
              Close
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <ResumeDocument />
        </div>
      </dialog>
    </>
  );
}

// The work filters are hidden for now; flip this to bring them back.
const showFilters = false;

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
  const [contactIntent, setContactIntent] = useState<ContactIntent>("project");
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
              <span className="work-count">({String(projects.length).padStart(2, "0")})</span>
            </h2>
          </div>
          {showFilters && (
            <div className="filters" aria-label="Filter projects">
              {["All work", ...new Set(projects.map((p) => p.category))].map((item) => (
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
          )}
        </div>
        <div className="project-grid" aria-live="polite">
          {projects
            .filter((p) => !showFilters || filter === "All work" || p.category === filter)
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
                  <span className="concept-label">
                    {"client" in project ? "Client work" : "Independent concept"}
                  </span>
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
            <span>To turn ideas</span>
            <span>
              into <em>sensible</em>
            </span>
            <span>
              <em>experiences</em>
            </span>
          </h2>
          <ResumeLink />
        </div>
        <div className="about-editorial-body">
          <p className="about-story-intro">
            I used to <em>cook</em> for a living.
            <br />
            Turns out the <em>jobs are the same.</em>
          </p>
          <div className="about-copy">
            <p>
              Six years in professional kitchens — line cook, pastry, sous chef, eventually running
              my own popup. Then I switched careers and learned a secret:{" "}
              <strong>designing software is just a slower, quieter mise en place.</strong> You scope
              the menu, you prep your stations, you cook in the order that keeps everything hot, and
              you taste constantly. Same discipline, different tools.
            </p>
            {/* The kitchen paragraph stays first; the design story opens below it. */}
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
              Different beginnings.
              <br />
              <em>Shared ambition.</em>
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
      <ContactSection intent={contactIntent} onIntentChange={setContactIntent} />
    </>
  );
}
