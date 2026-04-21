import type { JSX } from "react";

type SocialIconProps = {
  name: string;
};

export function SocialIcon({ name }: SocialIconProps): JSX.Element {
  switch (name) {
    case "envelope":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M3.75 6.75h16.5v10.5H3.75z" />
          <path d="m4.5 7.5 7.5 6 7.5-6" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2H21.5l-7.11 8.128L22.75 22h-6.547l-5.127-6.708L5.21 22H1.95l7.605-8.691L1.5 2h6.713l4.635 6.13L18.244 2Zm-1.148 18h1.804L7.228 3.895H5.292L17.096 20Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.35" cy="6.65" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "graduation-cap":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m2.75 9.5 9.25-4.75 9.25 4.75-9.25 4.75L2.75 9.5Z" />
          <path d="M6.5 11.4v4.1c0 1.35 2.45 2.75 5.5 2.75s5.5-1.4 5.5-2.75v-4.1" />
          <path d="M21.25 10v5.25" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .75a11.25 11.25 0 0 0-3.557 21.924c.563.104.769-.244.769-.543 0-.269-.01-.982-.016-1.928-3.127.68-3.787-1.507-3.787-1.507-.512-1.3-1.249-1.647-1.249-1.647-1.021-.697.077-.683.077-.683 1.129.08 1.723 1.16 1.723 1.16 1.003 1.718 2.632 1.222 3.273.934.102-.726.393-1.222.715-1.503-2.496-.284-5.12-1.248-5.12-5.556 0-1.227.438-2.23 1.157-3.017-.116-.284-.501-1.428.11-2.976 0 0 .944-.302 3.094 1.153a10.754 10.754 0 0 1 5.634 0c2.149-1.455 3.092-1.153 3.092-1.153.613 1.548.228 2.692.112 2.976.72.787 1.156 1.79 1.156 3.017 0 4.319-2.628 5.269-5.132 5.547.404.348.764 1.035.764 2.086 0 1.506-.014 2.721-.014 3.091 0 .302.203.653.775.542A11.25 11.25 0 0 0 12 .75Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5A1.48 1.48 0 1 1 5 6.46a1.48 1.48 0 0 1-.02-2.96ZM3.75 8.25h2.5v12h-2.5v-12Zm6 0h2.396v1.64h.034c.334-.632 1.152-1.64 2.371-1.64 2.535 0 3.004 1.669 3.004 3.84v8.16h-2.5v-7.23c0-1.725-.03-3.943-2.405-3.943-2.407 0-2.775 1.88-2.775 3.818v7.355h-2.5v-12Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
