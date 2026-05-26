export const site = {
  name: "Gaia Labs",
  parent: "Gaia Capital",
  tagline: "Early-stage tech investor",
  description:
    "Gaia Labs identifies and accelerates early-stage technology ventures at the intersection of deep tech, fintech, and sustainable innovation. We invest at Seed and Series A, providing not just capital but operational expertise, network access, and strategic guidance to help founders scale with conviction.",
  nav: [
    { label: "Approach", href: "#approach" },
    { label: "Focus", href: "#focus" },
    { label: "Contact", href: "#contact" },
  ],
  ctas: {
    primary: { label: "Get in touch", href: "#contact" },
    secondary: { label: "Our focus", href: "#focus" },
  },
  contactEmail: null as string | null,
  approach: [
    {
      title: "Identify",
      description:
        "We source and evaluate early-stage ventures at the frontier of deep tech, fintech, and sustainable innovation.",
    },
    {
      title: "Invest",
      description:
        "We deploy capital at Seed and Series A, taking conviction positions in founders and ideas we believe in.",
    },
    {
      title: "Accelerate",
      description:
        "We provide operational expertise, network access, and strategic guidance to help founders scale with conviction.",
    },
  ],
  focus: ["Deep Tech", "Fintech", "Sustainable Innovation", "Seed & Series A"],
  headlines: {
    beams: "We back the ventures that will define tomorrow",
    linear: "Accelerating the ventures that matter",
    raycast: "A different kind of investor",
    editorial: "Capital meets conviction",
  },
} as const;
