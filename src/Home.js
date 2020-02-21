import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "@reach/dialog/styles.css";
import store from "store";
import Create from "./components/Create";
import Show from "./components/Show";
import Edit from "./components/Edit";
import List from "./components/List";
import isLoggedIn from "./helpers/isLoggedIn";
import ShowProfile from "./components/ShowProfile";
import EditProfile from "./components/EditProfile";
import HomeList from "./components/HomeList";
import FourOhFour from "./components/FourOhFour";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

const handleLogout = history => () => {
  Cookie.remove("token");
  store.remove("loggedIn");
  console.log("you have been logged out. boo!");
  history.push("/login");
};

const Home = ({ history }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userid = jwt.decode(Cookie.get("token"));
    if (userid) {
      console.log(userid.username);
      setUser(userid.username);
    }
  }, []);

  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={"/home"} className="navbar-brand" data-testid="blog">
              My Blog
            </Link>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    to={"/create"}
                    className="nav-link"
                    data-testid="create"
                  >
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/list"} className="nav-link" data-testid="list">
                    List
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link" data-testid="user">
                    {user}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout(history)}
                    className="btn btn-outline-secondary"
                    data-testid="logout"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>{" "}
          <br />
          <h2>Welcome</h2> <br />
          <Switch>
            <Route exact={true} path="/create" component={Create} />
            <Route path="/show/:id" component={Show} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/list" component={List} />
            <Route path="/profile" component={ShowProfile} />
            <Route path="/homelist" component={HomeList} />
            <Route
              path="/editprofile"
              render={props => <EditProfile {...props} setUser={setUser} />}
            />
            <Redirect from="/home" exact to="/homelist" />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default Home;
