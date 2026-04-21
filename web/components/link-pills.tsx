type LinkItem = {
  label: string;
  url: string;
};

export function LinkPills({ links }: { links: LinkItem[] }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className="entry-links">
      {links.map((link) => (
        <a key={`${link.label}-${link.url}`} href={link.url}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
