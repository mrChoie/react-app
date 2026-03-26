import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function NavigationPanel() {
  const navTitle = " GameLib";
  let pageDirectory = ["Games", "About", "FAQs"];

  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid">
        <span className="navbar-brand pt-2 pb-2 me-3 fw-bold">
          <FontAwesomeIcon icon={faGamepad} />
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
                  selectedIndex === index
                    ? "nav-link border-start ps-3 pe-3 active fw-semibold"
                    : "nav-link border-start ps-3 pe-3"
                }
                onClick={() => {
                  setSelectedIndex(index);
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
