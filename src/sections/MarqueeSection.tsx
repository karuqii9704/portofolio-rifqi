import { useCallback, useEffect, useRef, useState } from 'react';
import WorkTile from '../components/WorkTile';
import { MOTION_REFERENCES, OWN_WORK } from '../data/content';
import type { MarqueeItem } from '../data/content';

const TILE = 'h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl';

function OwnWorkTile({ item }: { item: MarqueeItem }) {
  if (item.kind === 'image') {
    return (
      <div className={TILE}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={TILE}>
      <WorkTile name={item.name} meta={item.meta} tech={item.tech} tone={item.tone} />
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const node = sectionRef.current;
      if (!node) return;
      const sectionTop = node.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Row two is hotlinked from a third-party site we do not control, so drop any
  // source that fails rather than leaving broken-image tiles in the marquee.
  const [deadRefs, setDeadRefs] = useState<string[]>([]);
  const markDead = useCallback((src: string) => {
    setDeadRefs((current) => (current.includes(src) ? current : [...current, src]));
  }, []);

  const liveRefs = MOTION_REFERENCES.filter((src) => !deadRefs.includes(src));
  const rowOne = [...OWN_WORK, ...OWN_WORK, ...OWN_WORK];
  const rowTwo = [...liveRefs, ...liveRefs, ...liveRefs];

  return (
    <section
      ref={sectionRef}
      aria-label="Work and motion reference"
      className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <div className="mb-5 flex items-baseline justify-between px-6 md:px-10">
        <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-[#D7E2EA]/70 sm:text-xs">
          Selected work
        </p>
        {liveRefs.length > 0 && (
          <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-[#D7E2EA]/35 sm:text-xs">
            Motion reference — not my work
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
        >
          {rowOne.map((item, index) => (
            <OwnWorkTile key={`own-${index}`} item={item} />
          ))}
        </div>

        {liveRefs.length > 0 && (
          <div
            className="flex gap-3"
            style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
            aria-hidden="true"
          >
            {rowTwo.map((src, index) => (
              <div key={`ref-${index}`} className={TILE}>
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => markDead(src)}
                  className="h-full w-full object-cover opacity-70"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
