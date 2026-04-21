import Image from "next/image";
import type { JSX } from "react";

type ExperienceLogoProps = {
  company: string;
};

export function ExperienceLogo({ company }: ExperienceLogoProps): JSX.Element {
  const logoSrc = getLogoSrc(company);

  if (logoSrc) {
    return (
      <Image
        src={logoSrc}
        alt=""
        width={28}
        height={28}
        className="experience-logo-image"
      />
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function getLogoSrc(company: string): string | null {
  if (company.includes("Microsoft")) {
    return "/media/icons/brands/microsoft.svg";
  }

  if (company === "Google") {
    return "/media/icons/brands/google.svg";
  }

  if (company === "KalPay Technologies") {
    return "/media/icons/brands/kalpay.svg";
  }

  if (company === "Technologies of People Initiative Lab") {
    return "/media/icons/brands/tpi.svg";
  }

  return null;
}
