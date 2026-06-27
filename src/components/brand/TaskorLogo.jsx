import fullLogo from "../../assets/brand/taskor-logo-full.svg";
import iconLogo from "../../assets/brand/taskor-logo-icon.svg";
import darkFullLogo from "../../assets/brand/taskor-logo-full-dark.svg";
import React from "react";

const sizeClasses = {
  sm: "h-7",
  md: "h-8 sm:h-9",
  lg: "h-9 sm:h-10",
};

export default function TaskorLogo({
  variant = "full",
  theme = "light",
  size = "md",
  className = "",
  alt = "Taskor",
  href,
}) {
  const isIcon = variant === "icon";
  const isLightLogo = theme === "dark" || variant === "full-light";
  const src = isIcon ? iconLogo : isLightLogo ? darkFullLogo : fullLogo;
  const classes = [
    "block w-auto max-w-full shrink-0 object-contain drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]",
    sizeClasses[size] || sizeClasses.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const logo = <img src={src} alt={alt} className={classes} />;

  if (href) {
    return (
      <a href={href} className="inline-flex min-w-0 items-center" aria-label={alt}>
        {logo}
      </a>
    );
  }

  return logo;
}
