import { useState } from "react";

function SidePanel() {
  let sidePanelItems = [
    "Action",
    "Action-adventure",
    "Adventure",
    "Puzzle",
    "Role-playing",
    "Simulation",
    "Strategy",
    "Sports",
    "MMO",
  ];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="container-fluid text-light">
      <p className="display-6">Genre</p>
      <ul>
        {sidePanelItems.map((item, index) => (
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
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              aria-label="Checkbox for following text input"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidePanel;
