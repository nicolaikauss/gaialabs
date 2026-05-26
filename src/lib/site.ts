export const site = {
  name: "Gaia Labs",
  parent: "Gaia Capital",
  tagline: "Tech incubator",
  description:
    "A tech incubator under Gaia Capital. We launch products—mostly SaaS—and invest in tech and fintech.",
  nav: [
    { label: "Approach", href: "#approach" },
    { label: "Focus", href: "#focus" },
    { label: "Contact", href: "#contact" },
  ],
  ctas: {
    // Replace href with mailto: or external URL when ready
    primary: { label: "Get in touch", href: "#contact" },
    secondary: { label: "Our focus", href: "#focus" },
  },
  contactEmail: null as string | null,
  approach: [
    {
      title: "Launch",
      description:
        "We build and launch products—mostly SaaS—bringing ideas from concept to market.",
    },
    {
      title: "Invest",
      description:
        "We back opportunities in tech and fintech, partnering with builders we believe in.",
    },
    {
      title: "Build",
      description:
        "Operating under Gaia Capital, we combine capital with hands-on product execution.",
    },
  ],
  focus: ["SaaS", "Fintech", "Product building", "Tech"],
  headlines: {
    beams: "We build and back fintech products",
    linear: "Build products with precision",
    raycast: "A different kind of incubator",
    editorial: "Capital meets craft",
  },
} as const;
