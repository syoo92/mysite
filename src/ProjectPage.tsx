import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { Arrow, ContactSection, Flower, ProjectVisual, projects, type Project } from "./App";
import { Copy, Eyebrow, Heading } from "./components/PortfolioUI";

/** A clickable prototype embedded on the case study page, with a step list beside it. */
type PrototypeInfo = {
  src: string;
  title: string;
  heading: string;
  text: string;
  /** [screen id, label] pairs; the prototype reports and accepts these ids. */
  steps: [string, string][];
};

type CaseStudyFigure = { src: string; alt: string; caption?: string };

/** One case study, told in the same order on every page:
 *  at a glance → problem (ending on the question) → process → design → prototype → outcome. */
type CaseStudy = {
  /** The big idea, in one line. */
  takeaway: string;
  /** At a glance: the challenge, what we did, and the result. */
  glance: { challenge: string; approach: string; result: string };
  takeawayTags: string[];
  problem: { heading: string; body: string; points: string[]; question: string };
  process: {
    heading: string;
    body: string;
    /** Each step carries its own evidence, so the images sit next to the step they explain. */
    steps: {
      title: string;
      detail: string;
      figures?: CaseStudyFigure[];
      /** Usability findings grouped by label, e.g. Rose / Bud / Thorn. */
      insights?: { label: string; meaning: string; items: string[] }[];
    }[];
  };
  /** Each design principle, the screen it became, and what changed. */
  design: {
    heading: string;
    body: string;
    /** Each decision: what we built, how it was executed, and why. */
    rows: {
      principle: string;
      screen: string;
      what: string;
      how: string[];
      why: string;
      figure?: CaseStudyFigure;
    }[];
  };
  outcome: { heading: string; body: string; figures?: CaseStudyFigure[] };
  /** Standalone clickable prototype, shown on the page and openable full screen. */
  prototype?: PrototypeInfo;
};

const projectStories: Record<string, CaseStudy> = {
  sapphire: {
    takeaway: "Premium in the details. Consistent everywhere.",
    glance: {
      challenge:
        "A new card, brand and benefits, but everyday screens that still used the generic Chase look and hid $2,700+ a year in benefits.",
      approach:
        "Turned the agency’s messaging into a CX framework and journey maps, then decided which moments deserve a premium treatment.",
      result:
        "A refresh shipped across app and web, built from patterns that were reused for a second premium card.",
    },
    takeawayTags: ["Customer-centered", "Brand-led", "Built to scale"],
    prototype: {
      src: "/prototypes/sapphire/index.html",
      title: "Sapphire Reserve card refresh prototype",
      heading: "The card refresh, end to end.",
      text: "Tap through the first login, finish setup, explore the refreshed card account, then open a benefit from the carousel. Pick a step to jump straight to it.",
      steps: [
        ["welcome", "Warm Welcome"],
        ["credits", "Annual credits"],
        ["wallet", "Add to wallet"],
        ["setup", "Finish your setup"],
        ["account", "Card account"],
        ["benefit", "Use a benefit"],
      ],
    },
    problem: {
      heading: "A new card, the same old screens.",
      body: "Sapphire Reserve was getting a new card, brand and benefits. The agency messaging and brand guidelines were ready, but nothing defined what customers should see in the app. Everyday screens still used the generic Chase look, and the new benefits were easy to miss.",
      points: [
        "The messaging was written for marketing, not for product screens.",
        "$2,700+ a year in benefits sat in menus customers rarely open.",
        "Colors, type and actions didn’t match across app and web, and the work had to scale to other premium cards.",
      ],
      question: "How do you make a premium card feel premium in every digital moment?",
    },
    process: {
      heading: "From messaging to moments.",
      body: "With the brand team and our product partners, I turned high-level messaging into decisions about real screens.",
      steps: [
        {
          title: "Build a CX framework",
          detail:
            "Rewrote the agency’s messaging pillars as customer-experience rules a product team could act on.",
        },
        {
          title: "Map the journey",
          detail:
            "Mapped every platform and stage, then tagged each touchpoint as needed for launch, later, or not needed.",
        },
        {
          title: "Place the key messages",
          detail:
            "Matched each message to the moment it matters most, like discovering travel benefits or using annual credits.",
        },
        {
          title: "Apply the brand",
          detail:
            "Set how the new guidelines and photography show up in the product, in working sessions with the brand team.",
        },
      ],
    },
    design: {
      heading: "Premium, used with restraint.",
      body: "Premium isn’t more of everything. We saved the big moments for when they count and kept every other screen quietly consistent.",
      rows: [
        {
          principle: "Make arrival feel like an event",
          screen: "Warm Welcome",
          what: "A photo-led takeover for new cardmembers, followed by a setup checklist.",
          how: [
            "New copy and photography for the first three screens",
            "Queens Light headlines, with Blue800 buttons and checklist icons",
            "A checklist item for adding authorized users",
          ],
          why: "The first login is the one moment a full-screen experience earns its place, so takeovers stay limited to onboarding.",
          figure: {
            src: "/images/sapphire-design-welcome.avif",
            alt: "Four phone screens: Welcome to a new world of Sapphire, $2,700+ in annual credits, Use your new card today with Add to Apple Pay, and the Finish your setup checklist.",
            caption: "Three photo-led screens, then the setup checklist.",
          },
        },
        {
          principle: "Bring benefits to the surface",
          screen: "Benefit carousel",
          what: "Benefit tiles on the overview and card account screens, each linking to a page that shows how to use it.",
          how: [
            "Horizontal scroll on Blue800, with Reserve photography",
            "A smaller version on the functional card account screen",
            "No more than five tiles",
          ],
          why: "Benefits worth $2,700+ were buried in menus. Tiles put them where people already look, and five is about as far as people swipe.",
          figure: {
            src: "/images/sapphire-design-benefits.avif",
            alt: "Three phone screens: the card account, the Sapphire Reserve benefit carousel, and the $300 dining credit page.",
            caption: "From the card account to the carousel, and into a benefit.",
          },
        },
        {
          principle: "One system everywhere",
          screen: "Color, tiles and quick actions",
          what: "Every button, link, merchandising tile and quick action moved to one consistent look.",
          how: [
            "One Blue800 replaced Chase Blue and black",
            "Tiles rebranded with Reserve photography, and less relevant ones hidden",
            "Quick actions redrawn as linear icons from the upcoming design language",
          ],
          why: "A premium card should feel the same on every screen, in the app and on the web.",
          figure: {
            src: "/images/sapphire-design-system.avif",
            alt: "Two phone screens of the card account: Blue800 buttons and links at the top, and benefit tiles with linear quick-action icons further down.",
            caption: "One Blue800 for every action, rebranded tiles and linear quick actions.",
          },
        },
        {
          principle: "Built to scale",
          screen: "A second premium card",
          what: "The same components, applied to J.P. Morgan Reserve.",
          how: ["Same layouts and components", "Its own brown color, logo and photography"],
          why: "With reusable patterns, the next premium card only swaps its brand, not the design.",
          figure: {
            src: "/images/sapphire-design-jpmr.avif",
            alt: "J.P. Morgan Reserve versions of the welcome screens, benefit carousel and takeover, in brown.",
            caption: "The same patterns, reapplied to J.P. Morgan Reserve.",
          },
        },
      ],
    },
    outcome: {
      heading: "Premium in every moment.",
      body: "The refresh shipped across app and web, and its patterns now carry a second premium card.",
      figures: [
        {
          src: "/images/sapphire-overview.avif",
          alt: "Overview of the refreshed screens: Warm Welcome, benefit carousel, merchandising tiles, color and quick actions, and the existing cardmember and non-Reserve updates.",
          caption:
            "Everything that shipped, for new cardmembers, all Reserve cardmembers, existing cardmembers and non-Reserve cards.",
        },
      ],
    },
  },
  "buying-power": {
    takeaway: "Fewer steps. More trust. A clear next move.",
    glance: {
      challenge:
        "Current clients couldn’t see what they could afford next without applying for a mortgage, even though we already had their data.",
      approach:
        "Built a client story, mapped two data scenarios with our tech partners, and tested two ways to confirm info before showing a number.",
      result:
        "Hi-fi designs and MVP requirements handed to engineering, with a plan for how Buying Power fits the upcoming Buy / Sell experience.",
    },
    takeawayTags: ["Client-centered", "Tested early", "Built for the MVP"],
    prototype: {
      src: "/prototypes/buying-power/index.html",
      title: "Proactive Buying Power prototype",
      heading: "Buying Power, end to end.",
      text: "Confirm your info to see an updated number, search homes in your range, then try the dashboard card and adjust your loan details. Pick a step to jump straight to it.",
      steps: [
        ["takeover", "Login takeover"],
        ["confirm", "Confirm your info"],
        ["result", "Your Buying Power"],
        ["homes", "Search homes"],
        ["intro", "No data yet"],
        ["update", "Update your info"],
        ["dashboard", "Dashboard card"],
      ],
    },
    problem: {
      heading: "No clear view of the next home.",
      body: "Rocket clients couldn’t see what they could afford for their next home without applying for a mortgage. We already had their data, but weren’t using it to help them plan.",
      points: [
        "Goal: show current clients an accurate Buying Power number, using their soft credit data.",
        "Goal: inspire their next home purchase by previewing loan options.",
      ],
      question: "How might we show clients what they can afford next, before they ever apply?",
    },
    process: {
      heading: "Start with a story, then test it.",
      body: "With a second product designer, a content designer, a product manager and a tech partner, we went from a client story to scenario maps to usability testing.",
      steps: [
        {
          title: "Meet Susan",
          detail:
            "Wrote the story of Susan, a recent first-time buyer based on market research, to anchor the long-term vision.",
          figures: [
            {
              src: "/images/buyingpower-story-timeline.avif",
              alt: "Five numbered phone screens showing Susan’s journey from welcome to preparing to buy.",
              caption:
                "Susan’s journey: welcome, credit monitoring, Buying Power, Proactive Buying Power and the concierge experience.",
            },
          ],
        },
        {
          title: "Map two scenarios",
          detail:
            "Walked our tech partners through a decision tree for two cases: we have enough data to show a number, or we don’t.",
          figures: [
            {
              src: "/images/buyingpower-scenario-a-map.avif",
              alt: "Scenario A map: a client logs in and sees a Buying Power message with a number, filled in from their data.",
              caption: "Scenario A: enough data to fill in a number.",
            },
            {
              src: "/images/buyingpower-scenario-b-map.avif",
              alt: "Scenario B map: a soft intro screen, then a form to update location, income, monthly debts, down payment and credit score.",
              caption: "Scenario B: not enough data, so a general intro and a short form.",
            },
          ],
        },
        {
          title: "Test two ways to confirm",
          detail: "Tested a step-by-step yes or no flow against a single page with every field.",
          figures: [
            {
              src: "/images/buyingpower-testing.avif",
              alt: "The two tested flows side by side: a step-by-step confirmation and a single-page form.",
              caption: "The two flows we tested.",
            },
          ],
          insights: [
            {
              label: "Rose",
              meaning: "What worked",
              items: [
                "Both flows felt easy and quick.",
                "The layout pointed people to search homes, as we hoped.",
              ],
            },
            {
              label: "Bud",
              meaning: "Room to grow",
              items: [
                "Avoid placeholder values people have to change.",
                "Show the factors behind the number, and add a zip code field.",
              ],
            },
            {
              label: "Thorn",
              meaning: "What confused people",
              items: [
                "The loan amount and monthly payment didn’t look right.",
                "“Monthly Debt” wasn’t clear, and the factor breakdown was missing.",
              ],
            },
          ],
        },
      ],
    },
    design: {
      heading: "Three findings that shaped the design.",
      body: "Testing told us what mattered: get people to their number fast, explain it, and give them a next step.",
      rows: [
        {
          principle: "Fewer steps boost adoption",
          screen: "Scenario A: we have client data",
          what: "A login takeover that shows a Buying Power number right away.",
          how: [
            "A number pre-filled from the client’s data",
            "One page to confirm a few details, then an updated number",
            "Skip anytime, or continue to the dashboard or home search",
          ],
          why: "Both flows tested well, but a single page gets people to their number with the fewest steps.",
          figure: {
            src: "/images/buyingpower-final-scenario-a.avif",
            alt: "Four phone screens: discover your buying power at $435,000, confirm your info, updating your numbers, and the updated buying power of $500,000.",
            caption: "Takeover, confirm, update, and the new number.",
          },
        },
        {
          principle: "Show the factors to build trust",
          screen: "Scenario B: no client data yet",
          what: "A friendly intro that asks for a few details before showing a number.",
          how: [
            "An illustration instead of an empty number",
            "A short form with clear labels and a zip code field",
            "Then the same result screen as Scenario A, with its factors",
          ],
          why: "People questioned numbers they couldn’t explain, so every result shows what feeds into it.",
          figure: {
            src: "/images/buyingpower-final-scenario-b.avif",
            alt: "Two phone screens: Unlock your buying power with an illustration, and the Update your info form.",
            caption: "A friendly intro, then a short form.",
          },
        },
        {
          principle: "Homes in range drive the next step",
          screen: "Dashboard card",
          what: "A Buying Power card that stays on the dashboard.",
          how: [
            "Appears if the client skips the takeover",
            "Updates with their number once they confirm",
            "Adjust loan details or search homes right from the card",
          ],
          why: "Searching homes at that price was the natural next step, so the card keeps it one tap away.",
          figure: {
            src: "/images/buyingpower-final-dashboard.avif",
            alt: "Three dashboard states, a, b and c: the card before confirming, with a $510,000 number, and with loan details open.",
            caption: "Before confirming (a), with a number (b), and with loan details open (c).",
          },
        },
      ],
    },
    outcome: {
      heading: "Ready to build, and ready to grow.",
      body: "We handed off hi-fi designs and MVP requirements, plus a timeline of what ships first and what changes once the Buy / Sell experience is built.",
      figures: [
        {
          src: "/images/buyingpower-deliverables-timeline.avif",
          alt: "Annotated design file showing the takeover results and dashboard components planned for each release.",
          caption: "Annotated deliverables: what ships first, and what changes with Buy / Sell.",
        },
      ],
    },
  },
};

// The shared artifact copy doesn't include the prototype files, so the link is hidden there.
const isArtifactBuild =
  typeof window !== "undefined" && Boolean((window as { __ARTIFACT__?: boolean }).__ARTIFACT__);

/* The step list and the phone talk to each other: a click jumps the prototype to that
   screen, and the prototype reports back whichever screen is showing. */
function PrototypeSection({ prototype }: { prototype: PrototypeInfo }) {
  const { src, steps } = prototype;
  const frame = useRef<HTMLIFrameElement>(null);
  const [current, setCurrent] = useState(steps[0][0]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "proto-screen" && typeof e.data.id === "string") setCurrent(e.data.id);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const jump = (id: string) => {
    setCurrent(id);
    frame.current?.contentWindow?.postMessage({ type: "proto-go", id }, "*");
  };

  return (
    <section className="project-prototype" id="prototype" aria-labelledby="prototype-heading">
      <div className="project-prototype-copy">
        <Eyebrow>TRY IT YOURSELF</Eyebrow>
        <Heading id="prototype-heading">{prototype.heading}</Heading>
        <p className="project-prototype-text">{prototype.text}</p>
        <ol className="project-prototype-steps" aria-label="Jump to a screen">
          {steps.map(([id, label], i) => (
            <li key={id}>
              <button
                type="button"
                aria-current={current === id ? "step" : undefined}
                onClick={() => jump(id)}
              >
                <span className="project-prototype-step-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </button>
            </li>
          ))}
        </ol>
        <a className="text-action" href={src} target="_blank" rel="noopener">
          Open full screen <Arrow size={16} />
        </a>
      </div>
      <div className="project-prototype-device">
        <div className="project-prototype-screen">
          <iframe ref={frame} src={src} title={prototype.title} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* Floating section menu at the bottom of a case study: shows where you are and jumps to
   a section. It appears once the reader scrolls past the intro. */
function ProjectSectionNav({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState(items[0][0]);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ids = items.map(([id]) => id).join(",");

  // On narrow screens the menu scrolls sideways: keep the current section in view.
  useEffect(() => {
    const nav = navRef.current;
    const button = nav?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!nav || !button || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({
      left: button.offsetLeft - (nav.clientWidth - button.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = ids
        .split(",")
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));
      if (!sections.length) return;
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
      const first = sections[0].getBoundingClientRect().top;
      const last = sections[sections.length - 1].getBoundingClientRect().bottom;
      // Step aside while the reader uses the prototype, so it doesn't cover the phone.
      setVisible(
        current !== "prototype" &&
          first < window.innerHeight * 0.8 &&
          last > window.innerHeight * 0.5,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return (
    <nav
      ref={navRef}
      className={`project-section-nav${visible ? " is-visible" : ""}`}
      aria-label="Case study sections"
    >
      {items.map(([id, label]) => (
        <button
          type="button"
          key={id}
          aria-current={active === id ? "true" : undefined}
          tabIndex={visible ? 0 : -1}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

function CaseStudyFigures({ figures }: { figures?: CaseStudyFigure[] }) {
  if (!figures?.length) return null;
  return (
    <div className="project-figures">
      {figures.map((figure) => (
        <CaseStudyFigure figure={figure} key={figure.src} />
      ))}
    </div>
  );
}

function CaseStudyFigure({
  figure,
  className = "",
}: {
  figure: CaseStudyFigure;
  className?: string;
}) {
  return (
    <figure className={`project-figure ${className}`}>
      <img src={figure.src} alt={figure.alt} loading="lazy" />
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}

/** 01 Problem → 02 Process → 03 Design: the story up to the prototype. */
function CaseStudyStory({ story }: { story: CaseStudy }) {
  const { problem, process, design } = story;
  return (
    <>
      <section className="project-story-section" id="problem">
        <Eyebrow>01 / THE PROBLEM</Eyebrow>
        <Heading>{problem.heading}</Heading>
        <Copy>{problem.body}</Copy>
        <ul className="project-problem-points">
          {problem.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="project-question">
          <Eyebrow>THE QUESTION WE ASKED</Eyebrow>
          <Heading level={3}>{problem.question}</Heading>
        </div>
      </section>
      <section className="project-story-section" id="process">
        <Eyebrow>02 / THE PROCESS</Eyebrow>
        <Heading>{process.heading}</Heading>
        <Copy>{process.body}</Copy>
        <ol className="project-process-steps">
          {process.steps.map((step, index) => (
            <li className="project-process-step" key={step.title}>
              <div className="project-decision">
                <span className="decision-number">0{index + 1}</span>
                <div>
                  <Heading level={3}>{step.title}</Heading>
                  <Copy>{step.detail}</Copy>
                </div>
              </div>
              <CaseStudyFigures figures={step.figures} />
              {step.insights && (
                <div className="project-insights">
                  {step.insights.map((group) => (
                    <div className="project-insight" key={group.label}>
                      <span className="project-execution-strategy">{group.meaning}</span>
                      <Heading level={3}>{group.label}</Heading>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>
      <section className="project-story-section" id="design">
        <Eyebrow>03 / THE DESIGN</Eyebrow>
        <Heading>{design.heading}</Heading>
        <Copy>{design.body}</Copy>
        <div className="project-execution">
          {design.rows.map((row, index) => (
            <div className="project-execution-row" key={row.screen}>
              <span className="project-execution-strategy">
                0{index + 1} / {row.principle}
              </span>
              <Heading level={3}>{row.screen}</Heading>
              <dl className="project-design-points">
                <div>
                  <dt>What</dt>
                  <dd>{row.what}</dd>
                </div>
                <div>
                  <dt>How</dt>
                  <dd>
                    <ul>
                      {row.how.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Why</dt>
                  <dd>{row.why}</dd>
                </div>
              </dl>
              {row.figure && (
                <CaseStudyFigure figure={row.figure} className="project-execution-figure" />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectNeighbor({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  return (
    <Link className={`project-neighbor neighbor-${direction}`} to={`/work/${project.id}`}>
      <span className="neighbor-direction" aria-hidden="true">
        <Arrow size={20} />
      </span>
      <div className="neighbor-copy">
        <Eyebrow>{direction === "previous" ? "PREVIOUS PROJECT" : "NEXT PROJECT"}</Eyebrow>
        <Heading level={3}>
          {project.title}
          <span className="coral-period">.</span>
        </Heading>
        <Copy>
          {project.category} / {project.year}
        </Copy>
      </div>
      <div className="neighbor-visual">
        <ProjectVisual kind={project.kind} />
      </div>
    </Link>
  );
}

export function ProjectNotFound() {
  return (
    <section className="project-not-found">
      <Flower />
      <Eyebrow>A SMALL DETOUR / 404</Eyebrow>
      <Heading level={1}>
        This one’s still
        <br />
        <em>an idea.</em>
      </Heading>
      <Copy>
        That project page doesn’t exist. There’s plenty of good thinking back in selected work.
      </Copy>
      <Link className="primary-action" to="/#work">
        Back to selected work <Arrow size={17} />
      </Link>
    </section>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const projectIndex = projects.findIndex((item) => item.id === projectId);
  const project = projects[projectIndex];
  if (!project) return <ProjectNotFound />;

  const story = projectStories[project.id];
  if (!story) return <ProjectNotFound />;
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];
  const from = location.state?.from;
  const backTo = typeof from === "string" && /^\/(?:\?[^#]*)?#work$/.test(from) ? from : "/#work";

  return (
    <article className={`project-page project-page-${project.kind}`}>
      <div className="project-breadcrumb">
        <Link to={backTo} className="back-to-work">
          <span aria-hidden="true">←</span> All selected work
        </Link>
        <Eyebrow>
          CASE STUDY{" "}
          <span className="breadcrumb-number">
            0{projectIndex + 1} / {String(projects.length).padStart(2, "0")}
          </span>
        </Eyebrow>
      </div>

      <header className="project-intro project-hero-copy" aria-labelledby="project-page-title">
        <Eyebrow>
          {project.category} / {project.year}
        </Eyebrow>
        <Heading level={1} id="project-page-title">
          {project.title}
          <span className="coral-period">.</span>
        </Heading>
        <Heading level={2} className="project-hero-subtitle">
          {project.subtitle}
        </Heading>
        <Copy className="project-hero-description">{project.description}</Copy>
        <dl className="project-facts project-facts-row">
          <div>
            <dt>MY ROLE</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>THE FOCUS</dt>
            <dd>{project.focus}</dd>
          </div>
          <div>
            <dt>DELIVERABLES</dt>
            <dd>{project.deliverables}</dd>
          </div>
          <div>
            <dt>YEAR</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>PROJECT TYPE</dt>
            <dd>{"client" in project ? "Client work" : "Independent concept"}</dd>
          </div>
        </dl>
        <div className="project-intro-meta">
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {story.prototype && !isArtifactBuild && (
            <a className="primary-action project-prototype-link" href="#prototype">
              Try the prototype <Arrow size={17} />
            </a>
          )}
        </div>
      </header>

      <div className="project-cover project-gallery-stage">
        <ProjectVisual kind={project.kind} />
      </div>

      <section
        className="project-takeaway project-summary project-glance"
        id="overview"
        aria-label="At a glance"
      >
        <div className="takeaway-label">
          <Flower />
          <Eyebrow>AT A GLANCE</Eyebrow>
        </div>
        <Heading>{story.takeaway}</Heading>
        <ol className="project-highlights">
          {(
            [
              ["The challenge", story.glance.challenge],
              ["What we did", story.glance.approach],
              ["The result", story.glance.result],
            ] as const
          ).map(([label, text], index) => (
            <li key={label}>
              <span className="decision-number">0{index + 1}</span>
              <span>{label}</span>
              <Copy>{text}</Copy>
            </li>
          ))}
        </ol>
        <div className="takeaway-tags">
          {story.takeawayTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <div className="project-editorial">
        <div className="project-story">
          <CaseStudyStory story={story} />
        </div>
      </div>

      {story.prototype && !isArtifactBuild && <PrototypeSection prototype={story.prototype} />}

      <div className="project-editorial">
        <div className="project-story">
          <section className="project-story-section project-outcome" id="outcome">
            <Eyebrow>04 / THE OUTCOME</Eyebrow>
            <Heading>{story.outcome.heading}</Heading>
            <Copy>{story.outcome.body}</Copy>
            <CaseStudyFigures figures={story.outcome.figures} />
          </section>
        </div>
      </div>

      <ProjectSectionNav
        items={[
          ["overview", "At a glance"],
          ["problem", "Problem"],
          ["process", "Process"],
          ["design", "Design"],
          ...((story.prototype && !isArtifactBuild ? [["prototype", "Prototype"]] : []) as [
            string,
            string,
          ][]),
          ["outcome", "Outcome"],
        ]}
      />

      <nav className="project-pagination" aria-label="Explore more projects">
        <ProjectNeighbor project={previous} direction="previous" />
        <ProjectNeighbor project={next} direction="next" />
      </nav>
      <div className="project-all-work">
        <Link className="text-action" to={backTo}>
          Back to all selected work <Arrow size={16} />
        </Link>
      </div>

      <ContactSection compact />
    </article>
  );
}
