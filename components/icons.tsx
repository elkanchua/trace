import type { FileType } from "@/lib/data";

export function FileTypeIcon({
  type,
  className = "h-4 w-4",
}: {
  type: FileType;
  className?: string;
}) {
  switch (type) {
    case "notion":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887L6.2 6.354c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.222-.187zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.215-1.632z" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 38 57" className={className}>
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "slack":
      return (
        <svg viewBox="0 0 127 127" className={className}>
          <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80z" fill="#E01E5A" />
          <path d="M33.8 80c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
          <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47z" fill="#36C5F0" />
          <path d="M47 33.6c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H14C6.7 60 .8 54.1.8 46.8c0-7.3 5.9-13.2 13.2-13.2h33z" fill="#36C5F0" />
          <path d="M99.9 46.8c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.8z" fill="#2EB67D" />
          <path d="M93.3 46.8c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2v-33C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33z" fill="#2EB67D" />
          <path d="M80.1 99.6c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.6h13.2z" fill="#ECB22E" />
          <path d="M80.1 93c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-33z" fill="#ECB22E" />
        </svg>
      );
    case "pinterest":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#BD081C">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.194-.333 1.361-.052.22-.174.266-.401.16-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12C24 5.372 18.627 0 12 0" />
        </svg>
      );
    case "image":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="4" width="18" height="16" rx="2.2" stroke="#2563eb" strokeWidth="1.6" />
          <circle cx="8.5" cy="9.5" r="1.6" fill="#2563eb" />
          <path d="m4 17 4.5-4.5 3.5 3.5 3-3 5 5" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "pdf":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="#dc2626" strokeWidth="1.6" />
          <path d="M14 3v4h4" stroke="#dc2626" strokeWidth="1.6" />
          <path d="M8.5 15.5h1a1.2 1.2 0 0 0 0-2.4h-1v4M13 13.1v4M13 13.1h1.6M13 15.1h1.4M16.4 13.1v4h.8a1.6 1.6 0 0 0 0-4h-.8Z" stroke="#dc2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "link":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M9.5 14.5 14.5 9.5M8 11.5l-1.7 1.7a3.3 3.3 0 0 0 4.7 4.7l1.7-1.7M16 12.5l1.7-1.7a3.3 3.3 0 0 0-4.7-4.7L11.3 7.8" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

export const TYPE_META: Record<FileType, { label: string }> = {
  notion: { label: "Notion" },
  figma: { label: "Figma" },
  github: { label: "GitHub" },
  slack: { label: "Slack" },
  image: { label: "Image" },
  pinterest: { label: "Pinterest" },
  pdf: { label: "PDF" },
  link: { label: "Link" },
};

export function SparkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5c.4 3.1 1.4 4.1 4.5 4.5-3.1.4-4.1 1.4-4.5 4.5-.4-3.1-1.4-4.1-4.5-4.5 3.1-.4 4.1-1.4 4.5-4.5ZM18.5 13c.2 1.6.7 2.1 2.3 2.3-1.6.2-2.1.7-2.3 2.3-.2-1.6-.7-2.1-2.3-2.3 1.6-.2 2.1-.7 2.3-2.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ---- Nav icons ----
export function NavIcon({
  name,
  className = "h-[18px] w-[18px]",
}: {
  name: "role" | "products" | "conflicts" | "decisions" | "activity" | "integrations" | "settings";
  className?: string;
}) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "role":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "products":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
          <path d="M3 7.5v9L12 21l9-4.5v-9M12 12v9" />
        </svg>
      );
    case "conflicts":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M10.3 3.6 2.5 17a1.8 1.8 0 0 0 1.6 2.7h15.8A1.8 1.8 0 0 0 21.5 17L13.7 3.6a1.8 1.8 0 0 0-3.4 0Z" />
          <path d="M12 9v4M12 16.5v.2" />
        </svg>
      );
    case "decisions":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
          <path d="m8.5 12 2.2 2.2L15.5 9.5" />
        </svg>
      );
    case "activity":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 12h4l2.5 6 4-13L16 12h5" />
        </svg>
      );
    case "integrations":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
          <path d="M17 13.5v7M13.5 17h7" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );
  }
}
