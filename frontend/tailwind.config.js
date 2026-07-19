import frappeUIPreset from "frappe-ui/src/tailwind/preset"

// frappe-ui's preset defines the whole fontSize scale in PIXELS, so the root
// font-size (index.css) cannot scale text — only rem-based utilities (icon
// size-*, spacing) respond to it. That's why a root bump alone moved the icons
// but left every bit of text at its fixed px size.
//
// Re-express the SAME scale in rem here (frappe-ui's own px tokens / 16, tuples
// unchanged) so a single root font-size becomes the dial for text, icons and
// spacing together, in proportion. To resize the UI, change ONLY the root
// font-size in src/index.css.
const rem = (px) => `${px / 16}rem`
const t = (px, lineHeight, letterSpacing, fontWeight) => [
  rem(px),
  { lineHeight, letterSpacing, fontWeight },
]

const fontSize = {
  "2xs": t(11, "1.15", "0.01em", "420"),
  xs: t(12, "1.15", "0.02em", "420"),
  sm: t(13, "1.15", "0.02em", "420"),
  base: t(14, "1.15", "0.02em", "420"),
  lg: t(16, "1.15", "0.02em", "400"),
  xl: t(18, "1.15", "0.01em", "400"),
  "2xl": t(20, "1.15", "0.01em", "400"),
  "3xl": t(24, "1.15", "0.005em", "400"),
  "p-2xs": t(11, "1.6", "0.01em", "420"),
  "p-xs": t(12, "1.6", "0.02em", "420"),
  "p-sm": t(13, "1.5", "0.02em", "420"),
  "p-base": t(14, "1.5", "0.02em", "420"),
  "p-lg": t(16, "1.5", "0.02em", "400"),
  "p-xl": t(18, "1.42", "0.01em", "400"),
  "p-2xl": t(20, "1.38", "0.01em", "400"),
  "p-3xl": t(24, "1.2", "0.005em", "400"),
}

export default {
  presets: [frappeUIPreset],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
    "../node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-[13px]",
    "text-[14px]",
    "text-[15px]",
    "text-[16px]",
    "text-[17px]",
    "text-[18px]",
    "text-[18px]",
    "text-[19px]",
    "leading-[1.2]",
    "leading-[1.4]",
    "leading-[1.5]",
    "leading-[1.6]",
    "leading-[1.8]",
    "leading-[2]",
    "leading-[2.2]",
    "leading-[2.5]",
    "leading-[3]",
  ],
  theme: {
    extend: {
      fontSize,
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
}
