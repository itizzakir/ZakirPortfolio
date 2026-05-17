import { useId } from "react";

export function BrandLogo({ className = "" }) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <span className={`brand-logo ${className}`} aria-hidden="true">
      <svg className="brand-logo__svg" viewBox="0 0 64 64" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="14" y1="16" x2="54" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAFFFF" />
            <stop offset="0.42" stopColor="#67E8F9" />
            <stop offset="0.72" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#F0ABFC" />
          </linearGradient>
        </defs>
        <rect className="brand-logo__panel" x="4" y="4" width="56" height="56" rx="17" />
        <path className="brand-logo__mesh" d="M16 16H48M16 32H48M16 48H48M16 16V48M32 16V48M48 16V48" />
        <path className="brand-logo__mark" stroke={`url(#${gradientId})`} d="M17 21H39L19 43H42" />
        <path className="brand-logo__mark brand-logo__mark-h" stroke={`url(#${gradientId})`} d="M44 21V43M44 32H54M54 21V43" />
        <path className="brand-logo__shine" d="M17 21H39L19 43H42M44 21V43M44 32H54M54 21V43" />
        <circle className="brand-logo__node brand-logo__node-a" cx="17" cy="21" r="2" />
        <circle className="brand-logo__node brand-logo__node-b" cx="54" cy="43" r="2" />
      </svg>
    </span>
  );
}
