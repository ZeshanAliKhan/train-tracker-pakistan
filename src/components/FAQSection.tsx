const faqItems = [
  {
    question: "Does this site show realtime Pakistan Railways GPS positions?",
    answer:
      "No. It shows official published timetable data and computes schedule windows around those times. That is deliberate, because a public verified realtime feed was not available for this project.",
  },
  {
    question: "Where did the timetable data come from?",
    answer:
      "The train, station, and fare summaries were curated from the public Pakistan Railways / PakRail website on April 29, 2026.",
  },
  {
    question: "Why do some trains show 'Scheduled en route'?",
    answer:
      "That label means the current Pakistan Standard Time falls inside the train's published departure and arrival window. It does not claim a live vehicle location.",
  },
  {
    question: "Can I use this page on mobile while comparing routes quickly?",
    answer:
      "Yes. The search controls are kept at the top and the selected-train panel is compact so you do not have to scroll past long content before using the tool.",
  },
];

export function FAQSection() {
  return (
    <section className="surface-card section-card" aria-labelledby="faq-section-title">
      <h2 id="faq-section-title" className="section-title">
        FAQ
      </h2>
      <ul className="faq-list">
        {faqItems.map((item) => (
          <li key={item.question}>
            <strong>{item.question}</strong>
            <p className="section-copy" style={{ marginTop: 6 }}>
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
