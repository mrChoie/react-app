function AboutPage() {
  return (
    <main className="container py-4 text-light">
      <section className="card border-0 shadow-sm">
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
    </main>
  );
}

export default AboutPage;
