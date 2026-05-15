import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="void"]'],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 24px hsl(var(--primary) / 0.45), 0 0 64px hsl(var(--secondary) / 0.22)",
        "neon-soft": "0 0 18px hsl(var(--primary) / 0.25), inset 0 0 24px hsl(var(--secondary) / 0.08)",
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(hsl(var(--primary) / 0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary) / 0.12) 1px, transparent 1px)",
        "neon-line":
          "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.9), hsl(var(--secondary) / 0.8), transparent)",
      },
      keyframes: {
        "border-spin": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-120% 0" },
          "100%": { backgroundPosition: "120% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "border-spin": "border-spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-glow": "pulseGlow 3.5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [animate],
};
