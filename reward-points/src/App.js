import "./App.css";
import { StatementOverview } from "./Components/statementOverview";

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-text"></span>
      </nav>
      <StatementOverview />
    </div>
  );
}

export default App;
