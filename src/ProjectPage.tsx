import { Link, useLocation, useParams } from "react-router";
import { Arrow, ContactSection, Flower, ProjectVisual, projects, type Project } from "./App";
import { Copy, Eyebrow, Heading } from "./components/PortfolioUI";

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
    /** Standalone clickable prototype, opened in a new tab. */
    prototype?: string;
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
            <a
              className="primary-action project-prototype-link"
              href={story.prototype}
              target="_blank"
              rel="noopener"
            >
              View prototype <Arrow size={17} />
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
                  A self-initiated concept, not commissioned client work. This outcome describes the
                  design direction, not measured business results.
                </Copy>
              </div>
            )}
          </section>
        </div>
      </div>

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
