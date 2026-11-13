// Cherry blossom mark that sits beside the "Soo Yoo" logo and spins while the logo is hovered.
// Drawn in a 100×100 box around the centre (50, 50); each layer is one shape repeated every 72°.

const ANGLES = [0, 72, 144, 216, 288];

// One petal pointing up from the centre, with the V-notch at its tip.
const PETAL =
  "M50 49 C47.5 45 38.2 36 37.4 26 C36.7 18 40 11 44.5 9.6 C46.6 8.9 48.4 9.6 49.2 11.2 L50 16 L50.8 11.2 C51.6 9.6 53.4 8.9 55.5 9.6 C60 11 63.3 18 62.6 26 C61.8 36 52.5 45 50 49 Z";
// Pink blush at the base of each petal.
const BLUSH =
  "M50 49 C46.5 45.5 43.5 40 44 35.5 C44.5 32 47.3 30.5 50 30.5 C52.7 30.5 55.5 32 56 35.5 C56.5 40 53.5 45.5 50 49 Z";
// Small five-point star at the centre.
const CORE =
  "M50 50.5 C48.2 48.6 47.4 46 48.3 43.8 C48.8 42.6 49.4 41.8 50 41 C50.6 41.8 51.2 42.6 51.7 43.8 C52.6 46 51.8 48.6 50 50.5 Z";

// Ten stamens between the petals, alternating long and short, each tipped with a dot.
const STAMENS = Array.from({ length: 10 }, (_, i) => {
  const angle = ((i * 36 + 18) * Math.PI) / 180;
  const length = i % 2 === 0 ? 15.5 : 13;
  const point = (r: number) => [50 + r * Math.sin(angle), 50 - r * Math.cos(angle)];
  const [x1, y1] = point(4);
  const [x2, y2] = point(length);
  return { x1, y1, x2, y2 };
});

export function BlossomMark() {
  return (
    <svg className="brand-flower" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g transform="rotate(-4 50 50)">
        {/* Darker edge: the same petals turned slightly, peeking out on one side. */}
        <g fill="#e8949a">
          {ANGLES.map((a) => (
            <path key={a} d={PETAL} transform={`rotate(${a + 5} 50 50)`} />
          ))}
        </g>
        <g fill="#f3c4c9">
          {ANGLES.map((a) => (
            <path key={a} d={PETAL} transform={`rotate(${a} 50 50)`} />
          ))}
        </g>
        <g fill="#eba2a8">
          {ANGLES.map((a) => (
            <path key={a} d={BLUSH} transform={`rotate(${a} 50 50)`} />
          ))}
        </g>
        <g stroke="#c24b5b" strokeWidth="0.8" strokeLinecap="round" fill="#c24b5b">
          {STAMENS.map((s, i) => (
            <g key={i}>
              <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
              <circle cx={s.x2} cy={s.y2} r="1.3" stroke="none" />
            </g>
          ))}
        </g>
        <g fill="#c24b5b">
          {ANGLES.map((a) => (
            <path key={a} d={CORE} transform={`rotate(${a} 50 50)`} />
          ))}
        </g>
      </g>
    </svg>
  );
}
