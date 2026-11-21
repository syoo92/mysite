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
    rows: {
      principle: string;
      why: string;
      screen: string;
      detail: string;
      changes: string[];
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
      body: "Sapphire Reserve was getting a new card, a new brand and new benefits. The agency had written the messaging, and the brand team had new guidelines and photography. But none of that told us what a customer should see when they open the app. The everyday screens still used the generic Chase look, and the new benefits were easy to miss.",
      points: [
        "The messaging framework was written for marketing, not for product screens.",
        "Benefits worth $2,700+ a year were buried in menus customers rarely open.",
        "Colors, type and quick actions didn’t match across the app and web.",
        "The work had to scale to other premium cards, not just this one.",
      ],
      question: "How do you make a premium card feel premium in every digital moment?",
    },
    process: {
      heading: "From messaging to moments.",
      body: "I worked with the brand team and our product partners to turn high-level messaging into decisions about real screens. Each step narrowed what we needed to design, and why.",
      steps: [
        {
          title: "Build a CX framework",
          detail:
            "We kept the agency framework’s top-level pillars, then wrote the lower levels as customer-experience implications that a product team could act on.",
        },
        {
          title: "Map the end-to-end journey",
          detail:
            "Journey maps covered each platform and stage, the jobs to be done, feelings and pain points, and tech capabilities. Every touchpoint was tagged as needed for launch, not needed, or not yet on the roadmap.",
        },
        {
          title: "Place the key messages",
          detail:
            "With the journey mapped, we matched each key message to the moment it mattered most, such as discovering travel benefits or using annual credits.",
        },
        {
          title: "Apply brand and photography",
          detail:
            "Working sessions with the brand team set how the Reserve guidelines and the new photo library would show up in the product, with small moments tailored to preferred customers.",
        },
      ],
    },
    design: {
      heading: "Premium, used with restraint.",
      body: "Premium isn’t more of everything. We saved the big moments for when they count and made every other screen feel quietly consistent. Each principle became a specific change, with a guardrail so it keeps working after launch.",
      rows: [
        {
          principle: "Make arrival feel like an event",
          why: "A new cardmember’s first login is the one time a full-screen, photo-led experience earns its place.",
          screen: "Warm Welcome",
          detail: "A new photo-led takeover for new cardmembers, followed by a setup checklist.",
          changes: [
            "New copy and photography for the first three screens",
            "Headlines in Queens Light, checklist icons and buttons in Blue800",
            "An added checklist item for authorized users",
            "Guardrail: full takeovers only for onboarding, never for longer flows",
          ],
          figure: {
            src: "/images/sapphire-design-welcome.avif",
            alt: "Four phone screens: Welcome to a new world of Sapphire, $2,700+ in annual credits, Use your new card today with Add to Apple Pay, and the Finish your setup checklist.",
            caption: "Warm Welcome: three photo-led screens, then the setup checklist.",
          },
        },
        {
          principle: "Bring benefits to the surface",
          why: "Put the most valuable benefits where customers already look, each one linking to a page that shows how to use it.",
          screen: "Benefit carousel",
          detail:
            "Net-new tiles on the overview and the card account screen, each linking to a benefit page.",
          changes: [
            "Blue800 background, horizontal scroll, Reserve photography for each destination",
            "A smaller tile on the card account screen to save space on a functional screen",
            "Guardrail: no more than five tiles, because people stop swiping after that",
          ],
          figure: {
            src: "/images/sapphire-design-benefits.avif",
            alt: "Three phone screens: the card account, the Sapphire Reserve benefit carousel, and the $300 dining credit page.",
            caption: "From the card account to the carousel, and into a benefit page.",
          },
        },
        {
          principle: "One system everywhere",
          why: "A single interaction color, one headline typeface, and quick actions in the upcoming product design language, across app and web.",
          screen: "Merchandising tiles, color and quick actions",
          detail:
            "The tiles in the transaction feed, every button and every quick action moved to the new look.",
          changes: [
            "Chase Blue and black replaced by one Blue800 for buttons, icons and links",
            "Tiles rebranded with Reserve photography, and less relevant ones hidden",
            "Quick actions redrawn as linear icons in the upcoming design language",
          ],
          figure: {
            src: "/images/sapphire-design-system.avif",
            alt: "Two phone screens of the card account: Blue800 buttons and links at the top, and benefit tiles with linear quick-action icons further down.",
            caption: "One Blue800 for every action, rebranded tiles and linear quick actions.",
          },
        },
        {
          principle: "Built to scale",
          why: "Design reusable patterns, so another premium card only needs to swap its color, logo and photography.",
          screen: "A second premium card",
          detail: "The same assets were reapplied to J.P. Morgan Reserve with its own brand.",
          changes: ["Same components and layouts", "Its own brown color, logo and photography"],
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
      body: "The refresh shipped across the app and web: a photo-led Warm Welcome, a new benefits carousel, rebranded merchandising tiles, one Blue800 interaction color, and quick actions in the upcoming product design language. The same patterns now carry a second premium card.",
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
      body: "Clients already in the Rocket ecosystem couldn’t get an accurate view of their options for a next loan, based on their current finances, without applying for a mortgage. We had their data, but we weren’t using it to help them plan.",
      points: [
        "Goal: proactively show current clients an accurate Buying Power number of what they can afford, using their soft credit data.",
        "Goal: inspire them to consider their next home purchase by previewing loan options powered by their data.",
      ],
      question: "How might we show clients what they can afford next, before they ever apply?",
    },
    process: {
      heading: "Start with a story, then test it.",
      body: "I worked with a second product designer, a content designer, a product manager and a tech partner. We moved from a client story, to scenario maps for our tech partners, to usability testing.",
      steps: [
        {
          title: "Meet Susan",
          detail:
            "To build empathy, we wrote the story of Susan, based on market research with existing clients. She just closed on her first home with Rocket. Her story was our starting point for the long-term vision of Buying Power.",
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
          ],
        },
        {
          title: "Map two scenarios",
          detail:
            "We walked our tech partners through a decision tree, along with scenario maps for two cases: when we have enough client data to fill in a Buying Power number, and when we don’t.",
          figures: [
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
          ],
        },
        {
          title: "Test two ways to confirm",
          detail:
            "Before showing an updated number, clients confirm their info. We tested a quick step-by-step flow with yes or no answers against a single page with every field.",
          figures: [
            {
              src: "/images/buyingpower-testing.avif",
              alt: "The two tested flows side by side: a step-by-step confirmation and a single-page form.",
              caption: "The two flows we tested: step by step, and a single page.",
            },
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
        },
      ],
    },
    design: {
      heading: "Three findings that shaped the design.",
      body: "Both confirmation flows tested well. The findings told us what mattered most: get people to their number fast, explain it, and give them something to do next. Each one became part of the hi-fi designs.",
      rows: [
        {
          principle: "Fewer steps boost adoption",
          why: "We chose the single-page confirmation, so people see their updated number with as few interactions as possible.",
          screen: "Scenario A: we have client data",
          detail: "A login takeover that shows a number right away.",
          changes: [
            "Login introduction takeover, with the option to skip",
            "A number based on the client’s data",
            "Confirm a few data points, then see an updated number",
            "Continue to the dashboard or search homes",
          ],
          figure: {
            src: "/images/buyingpower-final-scenario-a.avif",
            alt: "Four phone screens: discover your buying power at $435,000, confirm your info, updating your numbers, and the updated buying power of $500,000.",
            caption: "Takeover, confirm, update, and the new number.",
          },
        },
        {
          principle: "Show the factors to build trust",
          why: "We added a visual breakdown of what feeds into the number, placed right next to it.",
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
            caption: "No number yet: a friendly intro, then a short form.",
          },
        },
        {
          principle: "Homes in range drive the next step",
          why: "Searching for homes at the Buying Power price felt like the natural next step, so we kept it close, in line with the team working on Buy / Sell.",
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
            caption: "The card before confirming (a), with a number (b), and with loan details open (c).",
          },
        },
      ],
    },
    outcome: {
      heading: "Ready to build, and ready to grow.",
      body: "We handed off hi-fi designs and design requirements for the MVP. We also worked with other design teams to see how Buying Power would fit the upcoming Buy / Sell experience, and made a timeline of what ships in the first MVP and which components change once the Buy / Sell designs are built.",
      figures: [
        {
          src: "/images/buyingpower-deliverables-timeline.avif",
          alt: "Annotated design file showing the takeover results and dashboard components planned for each release.",
          caption: "Annotated deliverables, showing what ships first and what changes with Buy / Sell.",
        },
        {
          src: "/images/buyingpower-requirements.avif",
          alt: "Design requirements document for the MVP, listing takeover requirements and audience rules.",
          caption: "Design requirements for the MVP, written for our tech partners.",
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

function CaseStudyFigure({ figure, className = "" }: { figure: CaseStudyFigure; className?: string }) {
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
              <Copy className="project-design-why">{row.why}</Copy>
              <Copy>{row.detail}</Copy>
              <ul>
                {row.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
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
