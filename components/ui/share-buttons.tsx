"use client";

interface ShareButtonsProps {
  slug: string;
  title: string;
  coverImage?: string;
}

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const baseUrl = "https://zynai.hu";
  const articleUrl = `${baseUrl}/ai-tartalmak/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  const buttons = [
    {
      key: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg fill="currentColor" height={16} viewBox="0 0 24 24" width={16} aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      key: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg fill="currentColor" height={16} viewBox="0 0 24 24" width={16} aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      key: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg fill="currentColor" height={15} viewBox="0 0 24 24" width={15} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      key: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg fill="currentColor" height={16} viewBox="0 0 24 24" width={16} aria-hidden="true">
          <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.17l3.55 1.214 1.984 5.953a.75.75 0 0 0 1.315.199l2.359-3.067 3.956 2.965a2.25 2.25 0 0 0 3.498-1.378l2.812-14.625a2.25 2.25 0 0 0-2.078-2.396zm-9.9 12.198-1.005 2.76-.93-2.79-4.354-1.49 14.548-5.951-8.26 7.471z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8">
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
        Oszd meg
      </p>
      <div className="flex flex-wrap gap-3">
        {buttons.map(({ key, href, icon }) => (
          <a
            key={key}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            className="group flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-2 font-mono text-[12px] text-[var(--text-tertiary)] transition-all duration-200 hover:border-[rgba(189,255,0,0.3)] hover:bg-[rgba(189,255,0,0.06)] hover:text-[#BDFF00]"
          >
            {icon}
            {key}
          </a>
        ))}
      </div>
    </div>
  );
}
