import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavigationPanel from "./components/Navigation";
import Message from "./components/Message";
import Clock from "./components/Clock";

function App() {
  return (
    <div className="container-fluid p-0">
      <div>
        <NavigationPanel />
      </div>
      <div className="card-body">
        <Message />
        <button className="btn btn-outline-primary">
          <h3>
            Time <Clock />
          </h3>
        </button>
      </div>
    </div>
  );
}

export default App;
