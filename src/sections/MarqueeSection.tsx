import { useEffect, useRef, useState } from 'react';
import WorkCard from '../components/WorkCard';
import WorkModal from '../components/WorkModal';
import { WORK } from '../data/content';
import type { WorkItem } from '../data/content';

const HALF = Math.ceil(WORK.length / 2);
const ROW_ONE = WORK.slice(0, HALF);
const ROW_TWO = WORK.slice(HALF);

/** Repeat the row so it stays filled as the parallax drags it sideways. */
function repeat(items: WorkItem[]) {
  return [...items, ...items, ...items];
}

function Row({
  items,
  offset,
  onSelect,
}: {
  items: WorkItem[];
  offset: number;
  onSelect: (item: WorkItem) => void;
}) {
  return (
    <div className="flex gap-3" style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}>
      {repeat(items).map((item, index) => (
        <WorkCard
          key={`${item.id}-${index}`}
          item={item}
          onSelect={onSelect}
          duplicate={index >= items.length}
        />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<WorkItem | null>(null);

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

  return (
    <section
      ref={sectionRef}
      aria-label="Selected work"
      className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <div className="mb-5 flex items-baseline justify-between gap-4 px-6 md:px-10">
        <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-[#D7E2EA]/70 sm:text-xs">
          Selected work
        </p>
        <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-[#D7E2EA]/35 sm:text-xs">
          Hover to preview · click for detail
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Row items={ROW_ONE} offset={offset - 200} onSelect={setSelected} />
        <Row items={ROW_TWO} offset={-(offset - 200)} onSelect={setSelected} />
      </div>

      <WorkModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
