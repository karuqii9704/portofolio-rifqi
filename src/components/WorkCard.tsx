import WorkTile from './WorkTile';
import type { WorkItem } from '../data/content';

type WorkCardProps = {
  item: WorkItem;
  onSelect: (item: WorkItem) => void;
  /** Marquee rows repeat their items; only the first copy is exposed to AT. */
  duplicate?: boolean;
};

/**
 * A single marquee tile. Resting state shows the screenshot or the typographic
 * stand-in; hover and keyboard focus reveal the name, year, stack, and a
 * one-line summary. Activating it opens the full detail dialog.
 */
export default function WorkCard({ item, onSelect, duplicate = false }: WorkCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : 0}
      className="group relative h-[270px] w-[420px] shrink-0 cursor-pointer overflow-hidden rounded-2xl text-left"
    >
      {item.image ? (
        <img
          src={item.image.src}
          alt={item.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
        />
      ) : (
        <WorkTile name={item.name} meta={item.year} tech={item.stack.join(' · ')} tone={item.tone} />
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/85 to-[#0C0C0C]/10 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <p className="text-[0.6rem] font-light uppercase tracking-[0.22em] text-[#D7E2EA]/60">
          {item.year} · {item.context}
        </p>
        <h3 className="text-xl font-semibold uppercase leading-tight tracking-tight text-[#D7E2EA]">
          {item.name}
        </h3>
        <p className="text-sm font-light leading-snug text-[#D7E2EA]/80">{item.summary}</p>
        <p className="text-[0.62rem] font-light uppercase tracking-[0.18em] text-[#D7E2EA]/45">
          {item.stack.join(' · ')}
        </p>
      </div>
    </button>
  );
}
