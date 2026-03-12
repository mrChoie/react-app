function NavigationPanel() {
  const navTitle = "GameLib";
  let pageDirectory = ["Games", "About", "FAQs"];
  let selecetedIndex = 0;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid">
        <span className="navbar-brand pt-2 pb-2 me-3 ms-3 fw-bold">
          {navTitle}
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {pageDirectory.map((item, index) => (
              <li
                key={item}
                className={
                  selecetedIndex === index
                    ? "nav-link border-start ps-3 pe-3 active fw-semibold"
                    : "nav-link border-start ps-3 pe-3"
                }
                onClick={() => {
                  selecetedIndex = index;
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationPanel;
