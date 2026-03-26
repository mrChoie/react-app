const faqItems = [
  {
    question: "Question #1",
    answer: "Answer #1",
  },
];

function FaqsPage() {
  return (
    <main className="container py-4">
      <section className="card border-0 shadow-sm">
        <div className="card-body p-4 p-lg-5">
          <p className="text-uppercase text-muted small mb-2">FAQs</p>
          <h1 className="display-6 text-dark mb-4">Common questions</h1>
          <div className="accordion" id="faqAccordion">
            {faqItems.map((item, index) => {
              const headingId = `faq-heading-${index}`;
              const collapseId = `faq-collapse-${index}`;

              return (
                <div className="accordion-item" key={item.question}>
                  <h2 className="accordion-header" id={headingId}>
                    <button
                      className={`accordion-button ${
                        index === 0 ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded={index === 0}
                      aria-controls={collapseId}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    aria-labelledby={headingId}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FaqsPage;
