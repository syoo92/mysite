import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useParams } from "react-router";
import { Arrow, ContactSection, Flower, ProjectVisual, projects, type Project } from "./App";
import { Copy, Eyebrow, Heading } from "./components/PortfolioUI";

type CaseStudyFigure = { src: string; alt: string; caption?: string };

type CaseStudyChapters = {
  problem: { heading: string; body: string; points: string[]; figures?: CaseStudyFigure[] };
  process: {
    heading: string;
    body: string;
    steps: [string, string][];
    /** Usability findings grouped by label, e.g. Rose / Bud / Thorn. */
    insights?: { label: string; meaning: string; items: string[] }[];
    figures?: CaseStudyFigure[];
  };
  strategy: {
    heading: string;
    body: string;
    principles: [string, string][];
    figures?: CaseStudyFigure[];
  };
  execution: {
    heading: string;
    body: string;
    rows: {
      strategy: string;
      screen: string;
      detail: string;
      changes: string[];
      figure?: CaseStudyFigure;
    }[];
  };
  solution: { heading: string; body: string; figures?: CaseStudyFigure[] };
};

const projectStories: Record<
  string,
  {
    question: string;
    takeaway: string;
    principle: string;
    galleryTitle: string;
    galleryCaption: string;
    /** Client work: a real screen image for the gallery instead of the drawn mockup. */
    galleryImage?: { src: string; alt: string };
    takeawayTags?: string[];
    /** Standalone clickable prototype, shown on the page and openable full screen. */
    prototype?: string;
    /** Longer case study: replaces the default challenge / approach / outcome sections. */
    chapters?: CaseStudyChapters;
  }
> = {
  folio: {
    question: "How can managing money feel less overwhelming, and a little more human?",
    takeaway: "Less noise. A little more peace of mind.",
    principle: "A financial overview that puts understanding before information.",
    galleryTitle: "A calmer kind of money app.",
    galleryCaption:
      "The overview brings balance, spending, and personal goals into one clear picture.",
  },
  roam: {
    question:
      "How do you bring inspiration and planning together, without losing the joy of exploring?",
    takeaway: "Less itinerary. More possibility.",
    principle: "Make room for discovery, then make the next step feel easy.",
    galleryTitle: "Made for your next chapter.",
    galleryCaption:
      "From the discovery feed to place details, the experience keeps inspiration close to action.",
  },
  canvas: {
    question: "What if a workspace could make room for the way creative teams actually think?",
    takeaway: "A little structure. A lot of room to think.",
    principle: "Give messy ideas a shared home, without prescribing the creative process.",
    galleryTitle: "Good things start here.",
    galleryCaption:
      "A flexible workspace that balances visual exploration with the clarity teams need to move forward.",
  },
  sapphire: {
    question: "How do you make a premium card feel premium in every digital moment?",
    takeaway: "Premium in the details. Consistent everywhere.",
    principle:
      "A refresh grounded in a customer-experience framework and carried through every touchpoint.",
    galleryTitle: "A refresh, end to end.",
    galleryCaption:
      "A flyover of the updates, from Warm Welcome and the benefit carousel to merchandising tiles and quick actions.",
    galleryImage: {
      src: "/images/sapphire-overview.avif",
      alt: "Overview of the refreshed screens: Warm Welcome, benefit carousel, merchandising tiles, color and quick actions, and the existing cardmember and non-Reserve updates.",
    },
    takeawayTags: ["Customer-centered", "Brand-led", "Built to scale"],
    prototype: "/prototypes/sapphire/index.html",
    chapters: {
      problem: {
        heading: "A new card, the same old screens.",
        body: "Sapphire Reserve was getting a new card, a new brand and new benefits. The agency had written the messaging, and the brand team had new guidelines and photography. But none of that told us what a customer should see when they open the app. The everyday screens still used the generic Chase look, and the new benefits were easy to miss.",
        points: [
          "The messaging framework was written for marketing, not for product screens.",
          "Benefits worth $2,700+ a year were buried in menus customers rarely open.",
          "Colors, type and quick actions didn’t match across the app and web.",
          "The work had to scale to other premium cards, not just this one.",
        ],
      },
      process: {
        heading: "From messaging to moments.",
        body: "I worked with the brand team and our product partners to turn high-level messaging into decisions about real screens. Each step narrowed what we needed to design, and why.",
        steps: [
          [
            "Build a CX framework",
            "We kept the agency framework’s top-level pillars, then wrote the lower levels as customer-experience implications that a product team could act on.",
          ],
          [
            "Map the end-to-end journey",
            "Journey maps covered each platform and stage, the jobs to be done, feelings and pain points, and tech capabilities. Every touchpoint was tagged as needed for launch, not needed, or not yet on the roadmap.",
          ],
          [
            "Place the key messages",
            "With the journey mapped, we matched each key message to the moment it mattered most, such as discovering travel benefits or using annual credits.",
          ],
          [
            "Apply brand and photography",
            "Working sessions with the brand team set how the Reserve guidelines and the new photo library would show up in the product, with small moments tailored to preferred customers.",
          ],
        ],
      },
      strategy: {
        heading: "Premium, used with restraint.",
        body: "Premium isn’t more of everything. The strategy was to save the big moments for when they count, and make every other screen feel quietly consistent.",
        principles: [
          [
            "Make arrival feel like an event",
            "A new cardmember’s first login is the one time a full-screen, photo-led experience earns its place.",
          ],
          [
            "Bring benefits to the surface",
            "Put the most valuable benefits where customers already look, each one linking to a page that shows how to use it.",
          ],
          [
            "One system everywhere",
            "A single interaction color, one headline typeface, and quick actions in the upcoming product design language, across app and web.",
          ],
          [
            "Built to scale",
            "Design reusable patterns, so another premium card only needs to swap its color, logo and photography.",
          ],
        ],
      },
      execution: {
        heading: "How each idea became a screen.",
        body: "Each principle became a specific change in the product, with guardrails so the pattern would keep working after launch.",
        rows: [
          {
            strategy: "Make arrival feel like an event",
            screen: "Warm Welcome",
            detail: "A new photo-led takeover for new cardmembers, followed by a setup checklist.",
            changes: [
              "New copy and photography for the first three screens",
              "Headlines in Queens Light, checklist icons and buttons in Blue800",
              "An added checklist item for authorized users",
              "Guardrail: full takeovers only for onboarding, never for longer flows",
            ],
          },
          {
            strategy: "Bring benefits to the surface",
            screen: "Benefit carousel",
            detail:
              "Net-new tiles on the overview and the card account screen, each linking to a benefit page.",
            changes: [
              "Blue800 background, horizontal scroll, Reserve photography for each destination",
              "A smaller tile on the card account screen to save space on a functional screen",
              "Guardrail: no more than five tiles, because people stop swiping after that",
            ],
          },
          {
            strategy: "One system everywhere",
            screen: "Merchandising tiles, color and quick actions",
            detail:
              "The tiles in the transaction feed, every button and every quick action moved to the new look.",
            changes: [
              "Chase Blue and black replaced by one Blue800 for buttons, icons and links",
              "Tiles rebranded with Reserve photography, and less relevant ones hidden",
              "Quick actions redrawn as linear icons in the upcoming design language",
            ],
          },
          {
            strategy: "Built to scale",
            screen: "A second premium card",
            detail: "The same assets were reapplied to J.P. Morgan Reserve with its own brand.",
            changes: ["Same components and layouts", "Its own brown color, logo and photography"],
          },
        ],
      },
      solution: {
        heading: "Premium in every moment.",
        body: "The refresh shipped across the app and web: a photo-led Warm Welcome, a new benefits carousel, rebranded merchandising tiles, one Blue800 interaction color, and quick actions in the upcoming product design language. The prototype below walks through it end to end, from the first login to using a benefit.",
      },
    },
  },
  "buying-power": {
    question: "How might we show clients what they can afford next, before they ever apply?",
    takeaway: "Fewer steps. More trust. A clear next move.",
    principle:
      "An estimate built from what we already know, with the reasons behind the number in plain view.",
    galleryTitle: "From first login to the dashboard.",
    galleryCaption:
      "The final designs for Scenario A: the login takeover, confirming a few details, updating, and the new Buying Power number.",
    galleryImage: {
      src: "/images/buyingpower-final-scenario-a.avif",
      alt: "Four phone screens: discover your buying power at $435,000, confirm your info, updating your numbers, and the updated buying power of $500,000.",
    },
    takeawayTags: ["Client-centered", "Tested early", "Built for the MVP"],
    chapters: {
      problem: {
        heading: "No clear view of the next home.",
        body: "Clients already in the Rocket ecosystem couldn’t get an accurate view of their options for a next loan, based on their current finances, without applying for a mortgage. We had their data, but we weren’t using it to help them plan.",
        points: [
          "Goal: proactively show current clients an accurate Buying Power number of what they can afford, using their soft credit data.",
          "Goal: inspire them to consider their next home purchase by previewing loan options powered by their data.",
        ],
      },
      process: {
        heading: "Start with a story, then test it.",
        body: "I worked with a second product designer, a content designer, a product manager and a tech partner. We moved from a client story, to scenario maps for our tech partners, to usability testing, and finally to hi-fi designs and a delivery plan.",
        steps: [
          [
            "Meet Susan",
            "To build empathy, we wrote the story of Susan, based on market research with existing clients. She just closed on her first home with Rocket. Her story was our starting point for the long-term vision of Buying Power.",
          ],
          [
            "Map two scenarios",
            "We walked our tech partners through a decision tree, along with scenario maps for two cases: when we have enough client data to fill in a Buying Power number, and when we don’t.",
          ],
          [
            "Test two ways to confirm",
            "Before showing an updated number, clients confirm their info. We tested a quick step-by-step flow with yes or no answers against a single page with every field.",
          ],
          [
            "Plan the delivery",
            "With the hi-fi designs settled, we worked with other design teams to see how Buying Power would fit into future features like the Buy / Sell experience.",
          ],
        ],
        insights: [
          {
            label: "Rose",
            meaning: "What worked",
            items: [
              "Test A felt easy to navigate.",
              "Test B felt like a quick, interactive questionnaire.",
              "The layout pointed people to “Search for this price on Rocket Homes,” as we hoped.",
            ],
          },
          {
            label: "Bud",
            meaning: "Room to grow",
            items: [
              "Avoid placeholder text that people have to change to get an accurate estimate.",
              "Show more of the factors that affect the monthly payment and price.",
              "Add a zip code field for more accurate location information.",
            ],
          },
          {
            label: "Thorn",
            meaning: "What confused people",
            items: [
              "The loan amount and monthly payment didn’t seem right for the estimate.",
              "Some participants didn’t recognize the “Monthly Debt” label.",
              "The results were missing a breakdown of the factors.",
            ],
          },
        ],
        figures: [
          {
            src: "/images/buyingpower-susan.avif",
            alt: "Meet Susan: two photos of a smiling woman. Susan just closed on her first home with Rocket.",
            caption: "Susan’s story, based on market research with existing clients.",
          },
          {
            src: "/images/buyingpower-story-timeline.avif",
            alt: "Five numbered phone screens showing Susan’s journey from welcome to preparing to buy.",
            caption:
              "Susan’s journey across five moments: welcome, credit monitoring, Buying Power, Proactive Buying Power and the concierge experience.",
          },
          {
            src: "/images/buyingpower-scenario-a-map.avif",
            alt: "Scenario A map: a client logs in and sees a Buying Power message with a number, filled in from their data.",
            caption: "Scenario A: we have enough client data to fill in their Buying Power.",
          },
          {
            src: "/images/buyingpower-scenario-b-map.avif",
            alt: "Scenario B map: a soft intro screen, then a form to update location, income, monthly debts, down payment and credit score.",
            caption:
              "Scenario B: not enough data, so a more general intro with the option to update their info.",
          },
          {
            src: "/images/buyingpower-testing.avif",
            alt: "The two tested flows side by side: a step-by-step confirmation and a single-page form.",
            caption: "The two flows we tested: step by step, and a single page.",
          },
        ],
      },
      strategy: {
        heading: "Three findings that shaped the design.",
        body: "Both confirmation flows tested well. The findings told us what mattered most: get people to their number fast, explain it, and give them something to do next.",
        principles: [
          [
            "Fewer steps boost adoption",
            "We chose the single-page confirmation, so people see their updated number with as few interactions as possible.",
          ],
          [
            "Show the factors to build trust",
            "We added a visual breakdown of what feeds into the number, placed right next to it.",
          ],
          [
            "Homes in range drive the next step",
            "Searching for homes at the Buying Power price felt like the natural next step, so we kept it close, in line with the team working on Buy / Sell.",
          ],
        ],
      },
      execution: {
        heading: "How the findings became screens.",
        body: "After testing and feedback from our tech partners, we moved to higher-fidelity designs for both scenarios and a dashboard card.",
        rows: [
          {
            strategy: "Fewer steps boost adoption",
            screen: "Scenario A: we have client data",
            detail: "A login takeover that shows a number right away.",
            changes: [
              "Login introduction takeover, with the option to skip",
              "A number based on the client’s data",
              "Confirm a few data points, then see an updated number",
              "Continue to the dashboard or search homes",
            ],
          },
          {
            strategy: "Show the factors to build trust",
            screen: "Scenario B: no client data yet",
            detail: "A friendly intro that asks for a few details before showing a number.",
            changes: [
              "Login introduction takeover, with the option to skip",
              "A general illustration, with no number yet",
              "Update their info, then continue to the Buying Power result from Scenario A",
            ],
            figure: {
              src: "/images/buyingpower-final-scenario-b.avif",
              alt: "Two phone screens: Unlock your buying power with an illustration, and the Update your info form.",
            },
          },
          {
            strategy: "Homes in range drive the next step",
            screen: "Dashboard card",
            detail: "A Buying Power card that stays on the dashboard.",
            changes: [
              "If the client skips the takeover, a Buying Power card appears on their dashboard",
              "Once they confirm their data, the card updates with their number",
              "They can quickly adjust loan details to update the number, and search homes from the card",
            ],
            figure: {
              src: "/images/buyingpower-final-dashboard.avif",
              alt: "Three dashboard states, a, b and c: the card before confirming, with a $510,000 number, and with loan details open.",
            },
          },
        ],
      },
      solution: {
        heading: "Ready to build, and ready to grow.",
        body: "We handed off hi-fi designs and design requirements for the MVP. To make sure Buying Power would fit with the upcoming Buy / Sell experience, we made a timeline of what ships in the first MVP and which components change once the Buy / Sell designs are built.",
        figures: [
          {
            src: "/images/buyingpower-deliverables-timeline.avif",
            alt: "Annotated design file showing the takeover results and dashboard components planned for each release.",
            caption:
              "Annotated deliverables, showing what ships first and what changes with Buy / Sell.",
          },
          {
            src: "/images/buyingpower-requirements.avif",
            alt: "Design requirements document for the MVP, listing takeover requirements and audience rules.",
            caption: "Design requirements for the MVP, written for our tech partners.",
          },
        ],
      },
    },
  },
  forma: {
    question: "How can a studio’s digital home feel as distinctive as the spaces it creates?",
    takeaway: "Architectural precision. A human point of view.",
    principle: "Give the work room to breathe, and the studio a voice of its own.",
    galleryTitle: "A different kind of everyday.",
    galleryCaption:
      "An expressive editorial website built around bold typography, thoughtful pacing, and the work itself.",
  },
};

// The shared artifact copy doesn't include the prototype files, so the link is hidden there.
const isArtifactBuild =
  typeof window !== "undefined" && Boolean((window as { __ARTIFACT__?: boolean }).__ARTIFACT__);

const prototypeScreens: [string, string][] = [
  ["welcome", "Warm Welcome"],
  ["credits", "Annual credits"],
  ["wallet", "Add to wallet"],
  ["setup", "Finish your setup"],
  ["account", "Card account"],
  ["benefit", "Use a benefit"],
];

/* The step list and the phone talk to each other: a click jumps the prototype to that
   screen, and the prototype reports back whichever screen is showing. */
function PrototypeSection({ src, children }: { src: string; children: ReactNode }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [current, setCurrent] = useState("welcome");

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "sapphire-screen" && typeof e.data.id === "string")
        setCurrent(e.data.id);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const jump = (id: string) => {
    setCurrent(id);
    frame.current?.contentWindow?.postMessage({ type: "sapphire-go", id }, "*");
  };

  return (
    <section className="project-prototype" id="prototype" aria-labelledby="prototype-heading">
      <div className="project-prototype-copy">
        {children}
        <ol className="project-prototype-steps" aria-label="Jump to a screen">
          {prototypeScreens.map(([id, label], i) => (
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
          <iframe
            ref={frame}
            src={src}
            title="Sapphire Reserve card refresh prototype"
            loading="lazy"
          />
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
      setVisible(first < window.innerHeight * 0.8 && last > window.innerHeight * 0.5);
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
        <figure className="project-figure" key={figure.src}>
          <img src={figure.src} alt={figure.alt} loading="lazy" />
          {figure.caption && <figcaption>{figure.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function CaseStudySections({ chapters }: { chapters: CaseStudyChapters }) {
  const { problem, process, strategy, execution, solution } = chapters;
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
        <CaseStudyFigures figures={problem.figures} />
      </section>
      <section className="project-story-section" id="process">
        <Eyebrow>02 / THE PROCESS</Eyebrow>
        <Heading>{process.heading}</Heading>
        <Copy>{process.body}</Copy>
        <div className="project-decisions">
          {process.steps.map(([title, detail], index) => (
            <div className="project-decision" key={title}>
              <span className="decision-number">0{index + 1}</span>
              <div>
                <Heading level={3}>{title}</Heading>
                <Copy>{detail}</Copy>
              </div>
            </div>
          ))}
        </div>
        <CaseStudyFigures figures={process.figures} />
        {process.insights && (
          <div className="project-insights">
            {process.insights.map((group) => (
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
      </section>
      <section className="project-story-section" id="strategy">
        <Eyebrow>03 / THE STRATEGY</Eyebrow>
        <Heading>{strategy.heading}</Heading>
        <Copy>{strategy.body}</Copy>
        <div className="project-principles">
          {strategy.principles.map(([title, detail]) => (
            <div className="project-principle" key={title}>
              <Heading level={3}>{title}</Heading>
              <Copy>{detail}</Copy>
            </div>
          ))}
        </div>
        <CaseStudyFigures figures={strategy.figures} />
      </section>
      <section className="project-story-section" id="execution">
        <Eyebrow>04 / STRATEGY TO EXECUTION</Eyebrow>
        <Heading>{execution.heading}</Heading>
        <Copy>{execution.body}</Copy>
        <div className="project-execution">
          {execution.rows.map((row) => (
            <div className="project-execution-row" key={row.screen}>
              <span className="project-execution-strategy">
                {row.strategy} <span aria-hidden="true">→</span>
              </span>
              <Heading level={3}>{row.screen}</Heading>
              <Copy>{row.detail}</Copy>
              <ul>
                {row.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
              {row.figure && (
                <figure className="project-figure project-execution-figure">
                  <img src={row.figure.src} alt={row.figure.alt} loading="lazy" />
                </figure>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="project-story-section project-outcome" id="solution">
        <Eyebrow>05 / THE SOLUTION</Eyebrow>
        <Heading>{solution.heading}</Heading>
        <Copy>{solution.body}</Copy>
        <CaseStudyFigures figures={solution.figures} />
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

      <section className="project-takeaway project-summary" aria-label="Project summary">
        <div className="takeaway-label">
          <Flower />
          <Eyebrow>THE BIG IDEA</Eyebrow>
        </div>
        <Heading>{story.takeaway}</Heading>
        <Copy>{story.principle}</Copy>
        <ol className="project-highlights">
          {project.decisions.map(([title], index) => (
            <li key={title}>
              <span className="decision-number">0{index + 1}</span>
              <span>{title}</span>
            </li>
          ))}
        </ol>
        <div className="takeaway-tags">
          {(
            story.takeawayTags ?? ["Human-centered", "Thoughtfully simple", "Built for clarity"]
          ).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <div className="project-cover project-gallery-stage">
        <ProjectVisual kind={project.kind} />
      </div>

      <div className="project-editorial">
        <section className="project-overview" id="overview" aria-label="Project overview">
          <Eyebrow>IT STARTED WITH A QUESTION</Eyebrow>
          <Heading>{story.question}</Heading>
        </section>

        <div className="project-story">
          {story.chapters ? (
            <CaseStudySections chapters={story.chapters} />
          ) : (
            <>
              <section className="project-story-section" id="challenge">
                <Eyebrow>01 / THE CHALLENGE</Eyebrow>
                <Heading>Start with the right question.</Heading>
                <Copy>{project.challenge}</Copy>
              </section>
              <section className="project-story-section" id="approach">
                <Eyebrow>02 / THE APPROACH</Eyebrow>
                <Heading>Make the complex feel simple.</Heading>
                <Copy>{project.solution}</Copy>
                <div className="project-decisions">
                  {project.decisions.map(([title, detail], index) => (
                    <div className="project-decision" key={title}>
                      <span className="decision-number">0{index + 1}</span>
                      <div>
                        <Heading level={3}>{title}</Heading>
                        <Copy>{detail}</Copy>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="project-story-section project-outcome" id="outcome">
                <Eyebrow>03 / THE DESIGN OUTCOME</Eyebrow>
                <Heading>A little more meaningful.</Heading>
                <Copy>{project.result}</Copy>
                {!("client" in project) && (
                  <div className="project-concept-disclaimer">
                    <Flower />
                    <Copy>
                      A self-initiated concept, not commissioned client work. This outcome describes
                      the design direction, not measured business results.
                    </Copy>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>

      {story.prototype && !isArtifactBuild && (
        <PrototypeSection src={story.prototype}>
          <Eyebrow>TRY IT YOURSELF</Eyebrow>
          <Heading id="prototype-heading">The card refresh, end to end.</Heading>
          <p className="project-prototype-text">
            Tap through the first login, finish setup, explore the refreshed card account, then open
            a benefit from the carousel. Pick a step to jump straight to it.
          </p>
        </PrototypeSection>
      )}

      <section className="project-gallery" id="gallery" aria-labelledby="gallery-heading">
        <div className="project-gallery-heading">
          <div>
            <Eyebrow>THE DETAILS MAKE THE DIFFERENCE</Eyebrow>
            <Heading id="gallery-heading">{story.galleryTitle}</Heading>
          </div>
          <span className="handwritten">a closer look ↙</span>
        </div>
        <figure className="project-gallery-figure">
          <div className="project-gallery-stage">
            {story.galleryImage ? (
              <img
                className="project-gallery-image"
                src={story.galleryImage.src}
                alt={story.galleryImage.alt}
                loading="lazy"
              />
            ) : (
              <ProjectVisual kind={project.kind} />
            )}
          </div>
          <figcaption>
            <span>01 / THE EXPERIENCE</span>
            <span>{story.galleryCaption}</span>
          </figcaption>
        </figure>
      </section>

      <ProjectSectionNav
        items={[
          ["overview", "Overview"],
          ...((story.chapters
            ? [
                ["problem", "Problem"],
                ["process", "Process"],
                ["strategy", "Strategy"],
                ["execution", "Execution"],
                ["solution", "Solution"],
              ]
            : [
                ["challenge", "Challenge"],
                ["approach", "Approach"],
                ["outcome", "Outcome"],
              ]) as [string, string][]),
          ...((story.prototype && !isArtifactBuild ? [["prototype", "Prototype"]] : []) as [
            string,
            string,
          ][]),
          ["gallery", "Gallery"],
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
