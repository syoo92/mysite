// Dynamic text: reads the visitor's text-size setting and exposes it to CSS as --text-scale.
// - Android Chrome: the <meta name="text-scale" content="scale"> tag in index.html makes the
//   root font size follow the phone's Font size setting, so 1rem / 16px is the scale.
// - iPhone and iPad Safari: Dynamic Type is exposed through the -apple-system-body system font,
//   whose default size is 17px. (macOS Safari also knows the keyword but uses 13px for it,
//   so the iOS path only runs on touch devices.)
// Type sizes in the CSS multiply by --ts-body or --ts-heading, which are derived from this value.

const BROWSER_DEFAULT_PX = 16;
const IOS_DEFAULT_BODY_PX = 17;

function readTextScale(): number {
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;";
  document.documentElement.appendChild(probe);
  let scale: number;
  if (navigator.maxTouchPoints > 0 && CSS.supports("font", "-apple-system-body")) {
    probe.style.font = "-apple-system-body";
    scale = parseFloat(getComputedStyle(probe).fontSize) / IOS_DEFAULT_BODY_PX;
  } else {
    probe.style.fontSize = "1rem";
    scale = parseFloat(getComputedStyle(probe).fontSize) / BROWSER_DEFAULT_PX;
  }
  probe.remove();
  if (!Number.isFinite(scale) || scale <= 0) return 1;
  // Smaller-than-default settings are honoured a little; very large ones are capped so layouts hold.
  return Math.min(Math.max(scale, 0.85), 2.5);
}

export function applyTextScale() {
  const root = document.documentElement;
  const apply = () => root.style.setProperty("--text-scale", readTextScale().toFixed(3));
  apply();
  // The setting can change while the page is open (e.g. after a trip to Settings).
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") apply();
  });
  window.addEventListener("resize", apply);
}
