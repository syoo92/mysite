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
  /** Optional use-case context for each screen, shown beside the phone. */
  context?: Record<string, { useCase: string; note: string }>;
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
  problem: {
    heading: string;
    body: string;
    points: string[];
    question: string;
    /** Optional "before" image. */
    figure?: CaseStudyFigure;
  };
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
      body: "We handed off hi‑fi designs and MVP requirements, plus a timeline of what ships first and what changes once the Buy / Sell experience is built.",
      figures: [
        {
          src: "/images/buyingpower-deliverables-timeline.avif",
          alt: "Annotated design file showing the takeover results and dashboard components planned for each release.",
          caption: "Annotated deliverables: what ships first, and what changes with Buy / Sell.",
        },
      ],
    },
  },
  "offers-playbook": {
    takeaway: "The right offer, at the right moment.",
    glance: {
      challenge:
        "Every client saw the same offers, the page had no clear hierarchy, and each new offer needed custom design work.",
      approach:
        "Defined what makes an offer valuable, built a playbook with the design systems team, and tested new layouts with ten participants.",
      result:
        "A simpler offers page with condensed cards and reusable patterns, launched in phases, and a playbook that streamlines future offers.",
    },
    takeawayTags: ["Personalized", "Systems thinking", "Tested with users"],
    problem: {
      heading: "Same offers, for everyone.",
      body: "Personalization in Rocket Mortgage Servicing was ad hoc, built in Adobe Target from Excel client lists that quickly went stale. The business had no clear way to present offers that actually helped clients.",
      points: [
        "Every client saw the same offers, some irrelevant, some too many.",
        "The page had no clear hierarchy of which offer lived where.",
        "Offer cards held too much content.",
      ],
      question:
        "How might we treat offers as a service that helps clients reach their home and financial goals?",
      figure: {
        src: "/images/playbook-before.avif",
        alt: "The offers page before the redesign: a large featured PowerPack offer, then a long list of all offers.",
        caption: "Before: one featured offer, then every offer for every client.",
      },
    },
    process: {
      heading: "Define value, then build the playbook.",
      body: "With a second designer, a content designer, a product manager and a tech partner, we defined what an offer is, built a playbook around it, and tested new layouts.",
      steps: [
        {
          title: "Define value",
          detail:
            "Whiteboarded what makes an offer valuable, then mapped current and upcoming offers by value and client relevance.",
          figures: [
            {
              src: "/images/playbook-matrix.avif",
              alt: "A matrix of offers plotted by value and client relevance, surrounded by sticky notes.",
              caption: "Offers mapped by value and client relevance. It got a little wobbly.",
            },
          ],
        },
        {
          title: "Build the playbook",
          detail:
            "Workshopped in Figma for two weeks, and partnered with the design systems team so offer content became its own UI element, with guidelines.",
          figures: [
            {
              src: "/images/playbook-pages.avif",
              alt: "Four playbook pages: about this playbook, definition, placement decisioning and client segments.",
              caption:
                "Playbook pages: purpose, definitions, placement decisioning and client segments.",
            },
          ],
        },
        {
          title: "Test new layouts",
          detail:
            "Designed quick layouts with a UX researcher and tested a prototype with ten participants.",
          figures: [
            {
              src: "/images/playbook-testing.avif",
              alt: "Survey results and sticky-note comments from the offers page prototype test.",
              caption: "Ratings and comments from the prototype test.",
            },
          ],
          insights: [
            {
              label: "Bento box",
              meaning: "Layout",
              items: ["Preferred over the carousel, because it shows every offer at a glance."],
            },
            {
              label: "Curated",
              meaning: "Content",
              items: ["People expected a curated list, with categories in a logical order."],
            },
            {
              label: "Survey",
              meaning: "Onboarding",
              items: ["A short survey felt welcome, since it curated offers without hiding any."],
            },
          ],
        },
      ],
    },
    design: {
      heading: "Simpler cards, smarter structure.",
      body: "Research and testing became three moves: a clearer structure, patterns built from existing components, and a page designed to grow.",
      rows: [
        {
          principle: "Make it easy to find the right offer",
          screen: "Information architecture",
          what: "A reorganized offers page, with new sections that appear based on each client’s selections.",
          how: [
            "Analyzed the original content, journey and layout",
            "Grouped offers into new sections by client need",
            "Advanced settings collapsed by default, backed by Salesforce audience data",
          ],
          why: "Clients struggled to find relevant offers, so the structure does the sorting for them.",
          figure: {
            src: "/images/playbook-ia.avif",
            alt: "A decision tree showing which offer sections a client sees.",
            caption: "Decision tree for which sections a client sees.",
          },
        },
        {
          principle: "Build from what exists",
          screen: "Patterns from existing components",
          what: "Offer cards, pills and layouts built from Rocket’s new design system.",
          how: [
            "Explored several options from existing cards, pills and layouts",
            "Clients pick a segment, purchase, refinance or nurture, to tailor the page",
            "The team chose a simpler layout with condensed card content",
          ],
          why: "Reusing components kept the product consistent and kept engineering effort low.",
          figure: {
            src: "/images/playbook-cards.avif",
            alt: "Wireframe options for offer cards with images, titles, descriptions and actions.",
            caption: "Card options explored from existing components.",
          },
        },
        {
          principle: "Design for where it’s going",
          screen: "A page built to grow",
          what: "Audience segmentation and a dynamic offers page, launched in phases.",
          how: [
            "A featured offer up top, then category pills and grouped offers",
            "Reusable patterns, so new offers drop in without new design",
            "Each phase launched in sequence as features were added",
          ],
          why: "Knowing the end goal let us build segmentation sustainably, so each phase builds on the last.",
          figure: {
            src: "/images/playbook-layout.avif",
            alt: "Wireframe of the dynamic offers page: featured headline, category pills, purchase offers and all offers.",
            caption: "The dynamic page: a featured offer, category pills and grouped offers.",
          },
        },
      ],
    },
    outcome: {
      heading: "Personal, and ready to scale.",
      body: "Simple card designs and offers based on client relevance are live today. Next, the playbook can grow into a marketplace template for more products and teams, cutting design time for every new offer.",
      figures: [
        {
          src: "/images/playbook-after.avif",
          alt: "The redesigned offers page: one large featured offer beside two smaller featured offers.",
          caption: "After: featured offers up top, with simpler cards.",
        },
      ],
    },
  },
  "soft-credit": {
    takeaway: "Know your credit. Know what to do next.",
    glance: {
      challenge:
        "Serviced clients rarely visited their accounts, and many people overestimate their credit or don’t know what a good score is.",
      approach:
        "Turned research on credit misconceptions into a consent-to-score flow, then tested it and fixed the copy and visuals where people got stuck.",
      result:
        "Soft credit monitoring launched across all Rocket platforms within three months, from the consent form to prefilled data.",
    },
    takeawayTags: ["Research-led", "Plain language", "Shipped in three months"],
    prototype: {
      src: "/prototypes/soft-credit/index.html",
      title: "Soft credit monitoring prototype",
      heading: "Credit tracking, end to end.",
      text: "Sign up from the dashboard card, agree to the three consents, then see how the score card changes by score range. Pick a step to jump straight to it.",
      steps: [
        ["null", "Not activated"],
        ["welcome", "Three steps away"],
        ["consent-1", "Soft credit check"],
        ["consent-2", "Personalize"],
        ["consent-3", "Share your data"],
        ["score-800", "Score 750–850"],
        ["score-700", "Score 660–749"],
        ["score-650", "Score 620–659"],
        ["score-500", "Score 300–619"],
        ["error", "Couldn’t enroll"],
        ["unenroll", "Unenroll"],
      ],
      context: {
        null: {
          useCase: "Null state · not signed up",
          note: "The card promises one thing, a free score that never hurts your credit, with Enroll as the only action.",
        },
        welcome: {
          useCase: "Standard sign-up · start",
          note: "A short sheet sets expectations before any legal text: three steps, about a minute.",
        },
        "consent-1": {
          useCase: "Step 1 of 3 · user agreement",
          note: "Plain language first, “it’ll never hurt your score,” then the full agreement for anyone who wants it.",
        },
        "consent-2": {
          useCase: "Step 2 of 3 · FCRA consent",
          note: "Leads with what the client gets, more relevant offers, and that their info is never sold.",
        },
        "consent-3": {
          useCase: "Step 3 of 3 · data sharing",
          note: "Benefits up front. Saying no still finishes sign-up, so the choice is real.",
        },
        "score-800": {
          useCase: "Activated · score 750–850",
          note: "Celebrates the score and ties it to the best rates on a new mortgage.",
        },
        "score-700": {
          useCase: "Activated · score 660–749",
          note: "Encouraging: competitive rates are within reach.",
        },
        "score-650": {
          useCase: "Activated · score 620–659",
          note: "Says what raising the score would do, with three simple tips.",
        },
        "score-500": {
          useCase: "Activated · score 300–619",
          note: "Names the 620 threshold for a mortgage, with three simple tips.",
        },
        error: {
          useCase: "Error · unsuccessful enrollment",
          note: "When TransUnion’s info doesn’t match, the card explains why enrolling is paused: to keep the client’s identity safe.",
        },
        unenroll: {
          useCase: "Settings · unenroll",
          note: "The gear menu lets clients stop tracking, with a confirm step and an easy way to sign back up.",
        },
      },
    },
    problem: {
      heading: "A dashboard clients rarely visited.",
      body: "Rocket was redesigning the purchase experience for new and existing clients, but serviced clients rarely opened their accounts, especially on autopay. We wanted the account to become a personal, educational place, starting with their credit.",
      points: [
        "People tend to overestimate their credit scores.",
        "Many don’t know what a good score is, especially people with lower incomes or less formal financial education.",
        "Clients had little reason to come back between payments.",
      ],
      question:
        "How might we help clients understand their credit, improve it, and see how it helps their goals with Rocket?",
    },
    process: {
      heading: "From research to a tested flow.",
      body: "With a UI designer, a content designer, a product manager and a product owner, I went from research to wireframes to a user test.",
      steps: [
        {
          title: "Study how people see credit",
          detail:
            "Research showed people form beliefs about their credit that don’t match how agencies score it, which leads to overconfidence.",
        },
        {
          title: "Share the first approach",
          detail:
            "Shared research findings, opportunity areas, wireframes and mocks with stakeholders, then built a test flow from consent to score.",
        },
        {
          title: "Test with clients",
          detail:
            "Asked people to sign up for free credit monitoring on a mortgage site and talk through what they saw.",
          figures: [
            {
              src: "/images/softcredit-testing.avif",
              alt: "The test board: the scenario, the flow from dashboard to consent to score, sticky-note findings and a summary.",
              caption: "The test scenario, flow and findings.",
            },
          ],
          insights: [
            {
              label: "Rose",
              meaning: "What worked",
              items: [
                "Most found the process straightforward and easy to understand.",
                "The score at the end was clear.",
              ],
            },
            {
              label: "Bud",
              meaning: "Room to grow",
              items: [
                "40% saw it as a benefit, since their largest loan is their home.",
                "People asked for tips on improving their score.",
              ],
            },
            {
              label: "Thorn",
              meaning: "What confused people",
              items: [
                "Some didn’t know the term “soft credit check.”",
                "Others weren’t sure what would happen after enrolling.",
              ],
            },
          ],
        },
      ],
    },
    design: {
      heading: "Clear copy, a precise meter, a next step.",
      body: "The test pointed to three changes: say plainly what happens, show exactly where a score sits, and help people with lower scores improve.",
      rows: [
        {
          principle: "Set expectations up front",
          screen: "Entry point and consent",
          what: "A concise entry card and consent step that explains a soft credit check and where it leads.",
          how: [
            "Plain-language copy, written with our content designer",
            "The term “soft credit check” explained in place",
            "Says what happens next and where the client will land",
          ],
          why: "Some testers didn’t know the term or what to expect next, so the copy does the explaining.",
        },
        {
          principle: "Show exactly where a score sits",
          screen: "Credit score card",
          what: "A dashboard card with the client’s score on a meter from 300 to 850.",
          how: [
            "A precise indicator on the meter",
            "Change since the last update, the date and the scoring model",
            "Sits next to the loan snapshot on the dashboard",
          ],
          why: "People misjudge their credit, so the meter shows exactly where they stand.",
          figure: {
            src: "/images/softcredit-dashboard.avif",
            alt: "The client dashboard: a loan snapshot beside a Your Credit Score card showing 800 on a meter from 300 to 850.",
            caption: "The credit score card, next to the loan snapshot.",
          },
        },
        {
          principle: "Help, don’t just report",
          screen: "Tips for lower scores",
          what: "For lower scores, the card says what the number means for a mortgage and how to raise it.",
          how: [
            "A plain sentence on what the score means, like needing 620 or above to apply",
            "Three simple tips: pay on time, pay down high balances, check for mistakes",
          ],
          why: "Testers asked how to improve, and people with lower scores need a next step more than a number.",
          figure: {
            src: "/images/softcredit-tips.avif",
            alt: "Two credit score cards, 650 and 500, each with a short explanation and three tips to raise the score.",
            caption: "Scores of 650 and 500, each with tips to raise them.",
          },
        },
      ],
    },
    outcome: {
      heading: "Launched in three months.",
      body: "We launched soft credit monitoring across all Rocket platforms within three months, from the consent form to prefilled data. Next, V2 would use soft credit to speed up pre-qualification and other loan processes.",
    },
  },
};
/** Keeps the last two words of a line of copy together, so no paragraph, caption or
 *  heading ends on a lone word, even in browsers without `text-wrap: pretty`. */
function tidy(text: string): string {
  const words = text.trim().split(" ");
  if (words.length < 4 || words[words.length - 1].length > 14) return text;
  const i = text.lastIndexOf(" ");
  return text.slice(0, i) + "\u00a0" + text.slice(i + 1);
}
const untouchedKeys = new Set(["src", "alt", "prototype", "useCase"]);
function tidyAll<T>(value: T, key = ""): T {
  if (untouchedKeys.has(key)) return value;
  if (typeof value === "string") return tidy(value) as T;
  if (Array.isArray(value)) return value.map((item) => tidyAll(item)) as T;
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, tidyAll(v, k)])) as T;
  return value;
}
const stories: Record<string, CaseStudy> = tidyAll(projectStories);

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
      <div className="project-prototype-stage">
        {prototype.context?.[current] && (
          <aside className="project-prototype-context" aria-live="polite">
            <span className="project-execution-strategy">{prototype.context[current].useCase}</span>
            <p>{prototype.context[current].note}</p>
          </aside>
        )}
        <div className="project-prototype-device">
          <div className="project-prototype-screen">
            <iframe ref={frame} src={src} title={prototype.title} loading="lazy" />
          </div>
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
        {problem.figure && (
          <CaseStudyFigure figure={problem.figure} className="project-execution-figure" />
        )}
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

  const story = stories[project.id];
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
          {tidy(project.subtitle)}
        </Heading>
        <Copy className="project-hero-description">{tidy(project.description)}</Copy>
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
