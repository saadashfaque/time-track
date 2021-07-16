import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Tracker from "./components/tracker/tracker";
import Reports from "./components/reports/reports";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Tracker />
            </Route>
            <Route path="/reports">
              <Reports />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
