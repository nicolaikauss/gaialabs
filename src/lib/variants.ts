export const variants = [
  {
    slug: "beams",
    title: "Ethereal Beams",
    mood: "Cinematic 3D",
    defaultTheme: "dark" as const,
    previewClass: "bg-slate-950 from-emerald-500/30",
  },
  {
    slug: "linear",
    title: "Linear Clarity",
    mood: "Light precision",
    defaultTheme: "light" as const,
    previewClass: "bg-sky-50 from-slate-200",
  },
  {
    slug: "raycast",
    title: "Raycast Glow",
    mood: "Dark product",
    defaultTheme: "dark" as const,
    previewClass: "bg-slate-900 from-emerald-400/40",
  },
  {
    slug: "editorial",
    title: "8VC Editorial",
    mood: "Institutional serif",
    defaultTheme: "dark" as const,
    previewClass: "bg-stone-950 from-amber-800/20",
  },
] as const;

export type VariantSlug = (typeof variants)[number]["slug"];
