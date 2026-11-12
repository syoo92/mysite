import { useEffect, useRef, useState } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router";
import { Arrow, projects } from "../App";
import { Copy, Eyebrow, Heading } from "./PortfolioUI";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [time, setTime] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const workButtonRef = useRef<HTMLButtonElement>(null);
  const workPanelRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLUListElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  function closeNavigation() {
    setMenuOpen(false);
    setWorkOpen(false);
  }

  function closeDropdownAfterNavigation() {
    closeNavigation();
    mainRef.current?.focus({ preventScroll: true });
  }

  function openWorkWithFocus(last = false) {
    setWorkOpen(true);
    requestAnimationFrame(() => {
      const links = projectListRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      links?.[last ? links.length - 1 : 0]?.focus();
    });
  }

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
        }),
      );
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setWorkOpen(false);
    mainRef.current?.focus({ preventScroll: true });
    const project = projects.find((item) => location.pathname === `/work/${item.id}`);
    document.title = project
      ? `${project.title} — Soo Yoo, Product Designer`
      : location.pathname === "/"
        ? "Soo Yoo — Product Designer"
        : "Page not found — Soo Yoo";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        project?.description ??
          "Soo Yoo is a product designer connecting people, products, and business. Explore selected work and get in touch about product design roles and freelance projects.",
      );
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen && !workOpen) return;
    const handleOutsidePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setWorkOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (workOpen) {
        setWorkOpen(false);
        workButtonRef.current?.focus();
      } else {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, workOpen]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 480px)");
    const resetNavigation = () => {
      setMenuOpen(false);
      setWorkOpen(false);
    };
    mobile.addEventListener("change", resetNavigation);
    return () => mobile.removeEventListener("change", resetNavigation);
  }, []);

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        ref={headerRef}
        className="header"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
        }}
      >
        <Link className="brand" to="/" aria-label="Soo Yoo home" onClick={closeNavigation}>
          <span className="brand-word">Soo</span>
          <span className="brand-word">Yoo</span>
        </Link>
        <span className="header-clock">
          BROOKLYN, NY · EST <span>{time}</span>
        </span>
        <nav
          id="main-navigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          <div
            className={`nav-work-disclosure${workOpen ? " is-expanded" : ""}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setWorkOpen(true);
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType === "mouse" &&
                !workPanelRef.current?.contains(document.activeElement)
              )
                setWorkOpen(false);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setWorkOpen(false);
            }}
          >
            <button
              ref={workButtonRef}
              type="button"
              className="nav-work"
              aria-expanded={workOpen}
              aria-controls="work-dropdown"
              onClick={() => setWorkOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  openWorkWithFocus(event.key === "ArrowUp");
                }
              }}
            >
              Work <span className="work-count">{String(projects.length).padStart(2, "0")}</span>
              <svg
                className="work-chevron"
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>
            <div ref={workPanelRef} id="work-dropdown" className="work-dropdown" hidden={!workOpen}>
              <div className="work-dropdown-intro">
                <Eyebrow>A FEW THINGS I’VE MADE</Eyebrow>
                <Heading>
                  Good thinking.
                  <br />
                  <em>Thoughtfully made.</em>
                </Heading>
                <Copy>Digital products, websites, and the thinking behind the details.</Copy>
                <Link className="work-view-all" to="/#work" onClick={closeDropdownAfterNavigation}>
                  View all work <Arrow size={18} />
                </Link>
              </div>
              <div className="work-dropdown-projects">
                <Eyebrow>SELECTED PROJECTS / {String(projects.length).padStart(2, "0")}</Eyebrow>
                <ul ref={projectListRef} className="work-project-list">
                  {projects.map((project, index) => (
                    <li key={project.id}>
                      <Link
                        to={`/work/${project.id}`}
                        onClick={closeDropdownAfterNavigation}
                        aria-current={
                          location.pathname === `/work/${project.id}` ? "page" : undefined
                        }
                      >
                        <span className="work-project-index">0{index + 1}</span>
                        <div className="work-project-label">
                          <span className="work-project-title">{project.title}</span>
                          <span className="work-project-description">
                            {project.category} / {project.tags[0]}
                          </span>
                        </div>
                        <Arrow size={19} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Link to="/#about" onClick={closeNavigation}>
            About
          </Link>
          <Link to="/#collaborate" onClick={closeNavigation}>
            Work with me
          </Link>
          <Link className="contact-link" to="/#contact" onClick={closeNavigation}>
            Let’s talk <Arrow size={17} />
          </Link>
        </nav>
        <button
          ref={menuButtonRef}
          className="mobile-menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setWorkOpen(false);
          }}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label="Toggle navigation"
        >
          {menuOpen ? "Close" : "Menu"} <span>{menuOpen ? "−" : "+"}</span>
        </button>
      </header>
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Soo Yoo</span>
        <span>Thoughtfully made. A little coffee-fuelled.</span>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            });
          }}
        >
          Back to top ↑
        </a>
      </footer>
      <ScrollRestoration />
    </div>
  );
}
