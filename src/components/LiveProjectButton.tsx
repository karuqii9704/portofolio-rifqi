type LiveProjectButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export default function LiveProjectButton({
  href,
  label = 'Live Project',
  className = '',
}: LiveProjectButtonProps) {
  const classes = `inline-block shrink-0 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 sm:px-10 sm:py-3.5 sm:text-base ${className}`;

  if (!href) {
    return (
      <span className={`${classes} opacity-40`} aria-disabled="true">
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${classes} hover:bg-[#D7E2EA]/10`}>
      {label}
    </a>
  );
}
