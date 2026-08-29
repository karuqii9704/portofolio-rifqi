import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

function Character({
  char,
  range,
  progress,
}: {
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // A per-character scroll reveal is exactly the motion this setting opts out of.
  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  // Characters are split for the reveal, but grouped back into non-breaking
  // words so the browser still wraps on spaces rather than mid-word.
  const words = text.split(' ');
  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const start = cursor;
          cursor += word.length + 1; // the word plus the space that followed it
          return (
            <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {Array.from(word).map((char, charIndex) => {
                const at = start + charIndex;
                return (
                  <Character
                    key={charIndex}
                    char={char}
                    range={[at / total, (at + 1) / total]}
                    progress={scrollYProgress}
                  />
                );
              })}
              {wordIndex < words.length - 1 && <span>&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </p>
  );
}
