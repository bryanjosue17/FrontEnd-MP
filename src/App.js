import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddFiscalia from "./components/AddFiscalia";
import Fiscalia from "./components/Fiscalia";
import FiscaliasList from "./components/FiscaliasList";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/fiscalias" className="navbar-brand">
          Ministerio Público
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/fiscalias"} className="nav-link">
              Fiscalías
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/agregar"} className="nav-link">
              Agregar
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/fiscalias"]} component={FiscaliasList} />
          <Route exact path="/agregar" component={AddFiscalia} />
          <Route path="/fiscalias/:id" component={Fiscalia} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;