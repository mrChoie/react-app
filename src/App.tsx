import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavigationPanel, { type NavigationTab } from "./components/Navigation";
import GamesPage from "./pages/GamesPage";
import AboutPage from "./pages/AboutPage";
import FaqsPage from "./pages/FaqsPage";

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>("Games");

  function renderActivePage() {
    switch (activeTab) {
      case "About":
        return <AboutPage />;
      case "FAQs":
        return <FaqsPage />;
      case "Games":
      default:
        return <GamesPage />;
    }
  }

  return (
    <div className="container-fluid p-0">
      <NavigationPanel activeTab={activeTab} onTabChange={setActiveTab} />
      {renderActivePage()}
    </div>
  );
}

export default App;
