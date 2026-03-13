export const rawTokens = {
  color: {
    neutral: {
      0: "#FFFFFF",
      50: "#F7F7F8",
      100: "#EEEEF2",
      200: "#DFE2E8",
      500: "#8A909E",
      700: "#4A5161",
      900: "#171A21"
    },
    coral: {
      400: "#FF747A",
      500: "#FF5E66"
    },
    blue: {
      500: "#4C6FFF"
    },
    yellow: {
      300: "#FFD977"
    },
    mint: {
      300: "#A8E7D0"
    },
    lilac: {
      300: "#C9BEFF"
    },
    green: {
      500: "#16A34A"
    },
    red: {
      500: "#DC2626"
    }
  },
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem"
  },
  radius: {
    sm: "0.625rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.75rem"
  },
  shadow: {
    card: "0 12px 30px rgba(23, 26, 33, 0.08)",
    floating: "0 18px 40px rgba(255, 94, 102, 0.32)"
  },
  typography: {
    sans: "'SUIT Variable'",
    body: "0.95rem",
    title: "1.125rem"
  },
  motion: {
    fast: "160ms",
    normal: "240ms"
  },
  zIndex: {
    base: "1",
    fab: "30",
    overlay: "40",
    toast: "50"
  }
} as const;
