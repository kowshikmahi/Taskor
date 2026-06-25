import fullLogo from "../../assets/brand/taskor-logo-full.svg";
import iconLogo from "../../assets/brand/taskor-logo-icon.svg";
import darkFullLogo from "../../assets/brand/taskor-logo-full-dark.svg";
import React from "react";

export default function TaskorLogo({
  variant = "full",
  theme = "light",
  className = "",
  alt = "Taskor",
  href,
}) {
  let src = fullLogo;

  if (variant === "icon") {
    src = iconLogo;
  } else if (theme === "dark") {
    src = darkFullLogo;
  }

  const logo = <img src={src} alt={alt} className={className} />;

  if (href) {
    return (
      <a href={href} className="inline-flex items-center">
        {logo}
      </a>
    );
  }

  return logo;
}