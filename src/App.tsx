import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavigationPanel from "./components/Navigation";
import Message from "./components/Message";
import Clock from "./components/Clock";
import SidePanel from "./components/SidePanel";
import MainPanel from "./components/MainPanel";

function App() {
  return (
    <div className="container-fluid p-0">
      <div>
        <NavigationPanel />
      </div>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-sm-3 border border-1 border-danger">
            <SidePanel />
          </div>
          <div className="col-sm border border-1 border-warning">
            <MainPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
