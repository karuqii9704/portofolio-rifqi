type WorkTileProps = {
  name: string;
  meta?: string;
  tech?: string;
  /** Shifts the ambient wash so a grid of tiles doesn't look stamped. */
  tone?: number;
  className?: string;
  style?: React.CSSProperties;
  radiusClassName?: string;
};

const WASHES = [
  'radial-gradient(120% 90% at 18% 8%, rgba(118, 33, 176, 0.30) 0%, rgba(12,12,12,0) 62%)',
  'radial-gradient(120% 90% at 82% 12%, rgba(182, 0, 168, 0.26) 0%, rgba(12,12,12,0) 60%)',
  'radial-gradient(130% 95% at 50% 100%, rgba(190, 76, 0, 0.24) 0%, rgba(12,12,12,0) 64%)',
  'radial-gradient(120% 90% at 12% 92%, rgba(100, 105, 115, 0.38) 0%, rgba(12,12,12,0) 62%)',
];

/**
 * Typographic stand-in for work that has no public screenshot. It names the
 * project outright rather than dressing up unrelated imagery as a preview.
 */
export default function WorkTile({
  name,
  meta,
  tech,
  tone = 0,
  className = '',
  style,
  radiusClassName = 'rounded-2xl',
}: WorkTileProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden border border-[#D7E2EA]/15 p-5 sm:p-6 ${radiusClassName} ${className}`}
      style={{ background: `${WASHES[tone % WASHES.length]}, #101012`, ...style }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D7E2EA 1px, transparent 1px), linear-gradient(to bottom, #D7E2EA 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />
      <div className="relative">
        {meta && (
          <p className="text-[0.6rem] font-light uppercase tracking-[0.22em] text-[#D7E2EA]/55 sm:text-[0.68rem]">
            {meta}
          </p>
        )}
      </div>
      <div className="relative">
        <h3
          className="font-semibold uppercase leading-[1.05] tracking-tight text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1.05rem, 2.1vw, 1.7rem)' }}
        >
          {name}
        </h3>
        {tech && (
          <p className="mt-2 text-[0.62rem] font-light uppercase tracking-[0.18em] text-[#D7E2EA]/45 sm:text-[0.7rem]">
            {tech}
          </p>
        )}
      </div>
    </div>
  );
}
