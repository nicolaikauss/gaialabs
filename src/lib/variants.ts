export const variants = [
  {
    slug: "beams",
    title: "1",
    mood: "Cinematic 3D",
    defaultTheme: "dark" as const,
    previewClass: "bg-slate-950 from-emerald-500/30",
  },
  {
    slug: "linear",
    title: "2",
    mood: "Light precision",
    defaultTheme: "light" as const,
    previewClass: "bg-white from-emerald-100",
  },
  {
    slug: "raycast",
    title: "3",
    mood: "Dark product",
    defaultTheme: "dark" as const,
    previewClass: "bg-slate-900 from-emerald-400/40",
  },
  {
    slug: "editorial",
    title: "4",
    mood: "Institutional bold",
    defaultTheme: "dark" as const,
    previewClass: "bg-stone-950 from-amber-800/20",
  },
] as const;

export type VariantSlug = (typeof variants)[number]["slug"];
