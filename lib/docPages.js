export const navGroups = [
  {
    label: "Overview",
    items: [{ slug: "introduction", title: "Introduction" }],
  },
  {
    label: "Capabilities",
    items: [
      { slug: "defense", title: "Defense" },
      { slug: "offense", title: "Offense" },
      { slug: "production", title: "Production" },
      { slug: "procurement", title: "Global procurement" },
      { slug: "automation", title: "Automation" },
      { slug: "adaptability", title: "Adaptability" },
    ],
  },
  {
    label: "Architecture",
    items: [
      { slug: "arch-overview", title: "System overview" },
      { slug: "arch-ingestion", title: "Data ingestion" },
      { slug: "arch-sensors", title: "Sensor network" },
      { slug: "arch-ai", title: "AI pipeline" },
      { slug: "arch-sovereignty", title: "Data sovereignty" },
      { slug: "arch-dashboard", title: "Commander interface" },
      { slug: "arch-api", title: "Interception API" },
      { slug: "arch-infra", title: "Infrastructure" },
    ],
  },
];

export const allSlugs = navGroups.flatMap((g) => g.items.map((i) => i.slug));
