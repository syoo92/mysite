import { Link, useLocation, useParams } from "react-router";
import { Arrow, ContactSection, Flower, ProjectVisual, projects, type Project } from "./App";
import { Copy, Eyebrow, Heading } from "./components/PortfolioUI";

type CaseStudyChapters = {
  problem: { heading: string; body: string; points: string[] };
  process: { heading: string; body: string; steps: [string, string][] };
  strategy: { heading: string; body: string; principles: [string, string][] };
  execution: {
    heading: string;
    body: string;
    rows: { strategy: string; screen: string; detail: string; changes: string[] }[];
  };
  solution: { heading: string; body: string };
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

function CaseStudySections({ chapters }: { chapters: CaseStudyChapters }) {
  const { problem, process, strategy, execution, solution } = chapters;
  return (
    <>
      <section className="project-story-section">
        <Eyebrow>01 / THE PROBLEM</Eyebrow>
        <Heading>{problem.heading}</Heading>
        <Copy>{problem.body}</Copy>
        <ul className="project-problem-points">
          {problem.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
      <section className="project-story-section">
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
      </section>
      <section className="project-story-section">
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
      </section>
      <section className="project-story-section">
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
            </div>
          ))}
        </div>
      </section>
      <section className="project-story-section project-outcome">
        <Eyebrow>05 / THE SOLUTION</Eyebrow>
        <Heading>{solution.heading}</Heading>
        <Copy>{solution.body}</Copy>
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

      <section className="project-page-hero" aria-labelledby="project-page-title">
        <div className="project-hero-copy">
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
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className="project-concept-note">
            <span /> {"client" in project ? "Client work" : "A self-initiated design exploration"}
          </span>
          {story.prototype && !isArtifactBuild && (
            <a className="primary-action project-prototype-link" href="#prototype">
              Try the prototype <Arrow size={17} />
            </a>
          )}
        </div>
        <div className="project-hero-art">
          <ProjectVisual kind={project.kind} />
        </div>
      </section>

      <div className="project-editorial">
        <aside className="project-overview" aria-label="Project overview">
          <Eyebrow>IT STARTED WITH A QUESTION</Eyebrow>
          <Heading>{story.question}</Heading>
          <dl className="project-facts">
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
          <Link className="project-gallery-jump text-action" to="#gallery" preventScrollReset>
            A closer look <span aria-hidden="true">↓</span>
          </Link>
        </aside>

        <div className="project-story">
          <section className="project-takeaway">
            <div className="takeaway-label">
              <Flower />
              <Eyebrow>THE BIG IDEA</Eyebrow>
            </div>
            <Heading>{story.takeaway}</Heading>
            <Copy>{story.principle}</Copy>
            <div className="takeaway-tags">
              {(
                story.takeawayTags ?? ["Human-centered", "Thoughtfully simple", "Built for clarity"]
              ).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
          {story.chapters ? (
            <CaseStudySections chapters={story.chapters} />
          ) : (
            <>
              <section className="project-story-section">
                <Eyebrow>01 / THE CHALLENGE</Eyebrow>
                <Heading>Start with the right question.</Heading>
                <Copy>{project.challenge}</Copy>
              </section>
              <section className="project-story-section">
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
              <section className="project-story-section project-outcome">
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
        <section className="project-prototype" id="prototype" aria-labelledby="prototype-heading">
          <div className="project-prototype-copy">
            <Eyebrow>TRY IT YOURSELF</Eyebrow>
            <Heading id="prototype-heading">The card refresh, end to end.</Heading>
            <p className="project-prototype-text">
              Tap through the first login, finish setup, explore the refreshed card account, then
              open a benefit from the carousel. Arrow keys work too.
            </p>
            <ol className="project-prototype-steps">
              <li>Warm Welcome</li>
              <li>Annual credits</li>
              <li>Add to wallet</li>
              <li>Finish your setup</li>
              <li>Card account</li>
              <li>Use a benefit</li>
            </ol>
            <a className="text-action" href={story.prototype} target="_blank" rel="noopener">
              Open full screen <Arrow size={16} />
            </a>
          </div>
          <div className="project-prototype-device">
            <iframe
              src={story.prototype}
              title="Sapphire Reserve card refresh prototype"
              loading="lazy"
            />
          </div>
        </section>
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
