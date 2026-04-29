const relatedLinks = [
  {
    title: "Dubai Flights Updates",
    description: "Useful if you compare rail travel plans with flight-side schedule notes.",
    href: "https://sites.google.com/view/dubai-flights-updates/home",
  },
  {
    title: "UAE Dubai News",
    description: "A second travel-oriented page in the same network for broader movement and city updates.",
    href: "https://sites.google.com/view/uae-dubai-news/home",
  },
  {
    title: "Saint Petersburg Weather",
    description: "Weather context can matter when you are comparing longer route or departure decisions.",
    href: "https://sites.google.com/view/saint-petersburg-weather/home",
  },
  {
    title: "Creator App Hub Directory",
    description: "A crawlable directory for the broader owned-site network without overloading this page.",
    href: "https://zeshanalikhan.github.io/creator-app-hub-site/pages/site-directory.html",
  },
];

export function RelatedLinks() {
  return (
    <section className="surface-card section-card" aria-labelledby="related-links-title">
      <h2 id="related-links-title" className="section-title">
        Related travel and utility pages
      </h2>
      <div className="link-grid" style={{ marginTop: 18 }}>
        {relatedLinks.map((item) => (
          <a key={item.href} href={item.href} className="link-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
