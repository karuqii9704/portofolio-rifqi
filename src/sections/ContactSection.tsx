import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { EMAIL, SOCIALS } from '../data/content';

export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 md:px-10 md:pb-16"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 11vw, 150px)' }}
      >
        Let&apos;s build
      </FadeIn>

      <FadeIn
        delay={0.15}
        y={20}
        className="mt-10 flex flex-col items-center gap-8 sm:mt-14 md:mt-16"
      >
        <div className="flex flex-col items-center gap-3 text-[#D7E2EA] sm:flex-row sm:gap-8">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 text-sm font-light tracking-wide transition-opacity duration-200 hover:opacity-70 sm:text-base"
          >
            <Mail size={16} aria-hidden="true" />
            {EMAIL}
          </a>
          <span className="flex items-center gap-2 text-sm font-light uppercase tracking-wide opacity-60 sm:text-base">
            <MapPin size={16} aria-hidden="true" />
            Jambi, Indonesia
          </span>
        </div>

        <ContactButton />

        <ul className="flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-sm"
              >
                {social.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <p className="mt-12 border-t border-[#D7E2EA]/15 pt-6 text-center text-[0.65rem] font-light uppercase tracking-[0.22em] text-[#D7E2EA]/40 sm:text-xs">
        Rifqi Sigwan Nugraha — Software Engineer
      </p>
    </footer>
  );
}
