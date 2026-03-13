import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-surface-default)",
        foreground: "var(--color-text-primary)",
        card: "var(--color-surface-card)",
        muted: "var(--color-surface-muted)",
        border: "var(--color-border-subtle)",
        primary: "var(--color-accent-primary)",
        secondary: "var(--color-accent-secondary)",
        success: "var(--color-feedback-success)",
        danger: "var(--color-feedback-danger)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "9999px"
      },
      boxShadow: {
        card: "var(--shadow-card)",
        floating: "var(--shadow-floating)"
      },
      spacing: {
        4.5: "1.125rem"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
