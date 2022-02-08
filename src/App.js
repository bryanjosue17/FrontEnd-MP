import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddFiscalia from "./components/AddFiscalia";
import Fiscalia from "./components/Fiscalia";
import FiscaliasList from "./components/FiscaliasList";
import Login from "./components/Login";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {!isAuthenticated && (
          <a href={"/inicio"} className="navbar-brand">
            Inicio
          </a>
        )}

        {isAuthenticated && (
          <a href={"/fiscalias"} className="navbar-brand">
            Ministerio Público
          </a>
        )}
        <div className="navbar-nav mr-auto">
          {isAuthenticated ? (
            <>
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
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() =>
                    logout({ returnTo: "http://localhost:8081/inicio" })
                  }
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" onClick={() => loginWithRedirect()}>
                Login
              </Link>
            </li>
          )}
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/fiscalias"]} component={FiscaliasList} />
          <Route exact path="/inicio" component={Login} />
          <Route exact path="/agregar" component={AddFiscalia} />
          <Route path="/fiscalias/:id" component={Fiscalia} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
