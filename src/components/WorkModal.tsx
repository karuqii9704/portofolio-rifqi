import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import type { WorkItem } from '../data/content';

type WorkModalProps = {
  item: WorkItem | null;
  onClose: () => void;
};

/**
 * Full write-up for one piece of work. Escape and a backdrop click both close
 * it; focus moves to the close button on open and returns to the tile after.
 */
export default function WorkModal({ item, onClose }: WorkModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<Element | null>(null);

  useEffect(() => {
    if (!item) return;

    restoreFocusTo.current = document.activeElement;
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      if (restoreFocusTo.current instanceof HTMLElement) restoreFocusTo.current.focus();
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0C0C0C]/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.6rem] font-light uppercase tracking-[0.22em] text-[#D7E2EA]/60 sm:text-xs">
                  {item.year} · {item.context}
                </p>
                <h2
                  id="work-modal-title"
                  className="mt-2 font-semibold uppercase leading-tight tracking-tight text-[#D7E2EA]"
                  style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}
                >
                  {item.name}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full border border-[#D7E2EA]/40 px-4 py-2 text-xs uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
              >
                Close
              </button>
            </div>

            {item.image && (
              <img
                src={item.image.src}
                alt={item.image.alt}
                loading="lazy"
                decoding="async"
                className="mt-6 max-h-72 w-full rounded-2xl object-cover object-top"
              />
            )}

            <p className="mt-6 text-sm font-light leading-relaxed text-[#D7E2EA]/85 sm:text-base">
              {item.description}
            </p>

            {item.note && (
              <p className="mt-4 border-l-2 border-[#D7E2EA]/30 pl-4 text-xs font-light leading-relaxed text-[#D7E2EA]/60 sm:text-sm">
                {item.note}
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/25 px-3 py-1 text-[0.62rem] font-light uppercase tracking-[0.16em] text-[#D7E2EA]/70"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {item.href && (
              <div className="mt-8">
                <LiveProjectButton href={item.href} label={item.linkLabel ?? 'Live Project'} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
