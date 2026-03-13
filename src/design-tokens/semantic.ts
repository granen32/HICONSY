import { rawTokens } from "./tokens";

export const semanticTokens = {
  color: {
    surface: {
      default: rawTokens.color.neutral[50],
      card: rawTokens.color.neutral[0],
      muted: rawTokens.color.neutral[100],
      inverse: rawTokens.color.neutral[900]
    },
    text: {
      primary: rawTokens.color.neutral[900],
      secondary: rawTokens.color.neutral[700],
      muted: rawTokens.color.neutral[500],
      inverse: rawTokens.color.neutral[0]
    },
    border: {
      subtle: rawTokens.color.neutral[200]
    },
    accent: {
      primary: rawTokens.color.coral[500],
      secondary: rawTokens.color.blue[500],
      warning: rawTokens.color.yellow[300],
      mint: rawTokens.color.mint[300],
      lilac: rawTokens.color.lilac[300]
    },
    feedback: {
      success: rawTokens.color.green[500],
      danger: rawTokens.color.red[500]
    }
  }
} as const;
