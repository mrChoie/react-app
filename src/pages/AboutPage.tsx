const keyFeatures = [
  {
    title: "CSV-powered library",
    description:
      "Loads a video game dataset from a CSV file and turns it into a browsable game catalogue.",
  },
  {
    title: "Focused filtering",
    description:
      "Lets users narrow the library by genre, platform, year of release, and publisher.",
  },
  {
    title: "Quick search",
    description:
      "Includes a game name search so users can jump straight to a title without scanning every card.",
  },
  {
    title: "Flexible ranking",
    description:
      "Supports sorting by user count, global sales, and release year to explore the data in different ways.",
  },
  {
    title: "Paginated browsing",
    description:
      "Breaks a large dataset into smaller pages so the interface stays easier to read and navigate.",
  },
];

function AboutPage() {
  return (
    <main className="container py-4 text-light">
      <section className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4 p-lg-5">
          <p className="text-uppercase text-muted small mb-2">About</p>
          <h1 className="display-6 text-dark">What GameLib is for</h1>
          <p className="text-dark mb-3">
            GameLib is a simple game discovery interface built around a video
            game dataset. The project is designed to help users browse game
            titles, scan genres, and move through a large list without being
            overwhelmed by a long single-page layout.
          </p>
          <p className="text-dark mb-0">
            The Games tab is the main experience. It combines a side panel for
            genre-focused navigation and a main panel that displays paginated
            game cards, making the library easier to explore.
          </p>
        </div>
      </section>

      <section className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4 p-lg-5">
          <p className="text-uppercase text-muted small mb-2">Features</p>
          <h2 className="h3 text-dark mb-4">Key project features</h2>
          <div className="row g-3">
            {keyFeatures.map((feature) => (
              <div className="col-12 col-md-6" key={feature.title}>
                <article className="h-100 border rounded-3 p-3 bg-light">
                  <h3 className="h5 text-dark">{feature.title}</h3>
                  <p className="text-secondary mb-0">{feature.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="card border-0 shadow-sm">
        <div className="card-body p-4 p-lg-5">
          <p className="text-uppercase text-muted small mb-2">Planned</p>
          <h2 className="h3 text-dark mb-3">Feature idea for a future update</h2>
          <article className="border rounded-3 p-3 bg-light">
            <h3 className="h5 text-dark">Game details view</h3>
            <p className="text-secondary mb-0">
              Add a click-through details panel or modal for each game card so
              users can see expanded metadata, compare stats, and stay in the
              browsing flow without leaving the Games page.
            </p>
          </article>
        </div>
      </section> */}
    </main>
  );
}

export default AboutPage;
