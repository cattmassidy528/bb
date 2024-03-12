import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { AccountContext } from "./context";
// import { useParams } from "react-router-dom";

const Navigation = () => {

  const { currentUser } = useContext(AccountContext)
  const location = useLocation();
  // const { username } = useParams();

  const isActive = (path) => {
    const formattedPath = `/visitable/profile/${currentUser}`;
    return location.pathname.startsWith(formattedPath) ? "active" : "";
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light ">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              data-tooltip-content="return to home page"
              data-tooltip-id="hometool"
              className="navbar-brand ms-3"
              href="/"
            >
              B.B.
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav navbar-nav">
              <li className={`nav-item ${isActive("/visitable/profile/:username")}`}>
                <Link
                  className="nav-link"
                  data-tooltip-content="user profile page"
                  data-tooltip-id={"userprofiletool"}
                  to={"/visitable/profile/:username"}
                >
                  Profile
                </Link>
              </li>
              <li className={`nav-item ${isActive("/visitable/deposit")}`}>
                <Link
                  className="nav-link"
                  data-tooltip-content="deposit funds"
                  data-tooltip-id={"deposittool"}
                  to="/visitable/deposit"
                >
                  Deposit
                </Link>
              </li>
              <li className={`nav-item ${isActive("/visitable/withdraw")}`}>
                <Link
                  className="nav-link"
                  data-tooltip-content="withdraw funds"
                  data-tooltip-id={"withdrawtool"}
                  to="/visitable/withdraw"
                >
                  Withdraw
                </Link>
              </li>
              <li className={`nav-item ${isActive("/visitable/alldata")}`}>
                <Link
                  className="nav-link"
                  data-tooltip-content="Details of accounts and transactions"
                  data-tooltip-id={"alldatatool"}
                  to="/visitable/alldata"
                >
                  All Data
                </Link>
              </li>
              <li className={`nav-item ${isActive("/visitable/logout")}`}>
                <Link
                  className="nav-link"
                  data-tooltip-content="log out"
                  data-tooltip-id={"logouttool"}
                  to="/visitable/logout"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-row-reverse ">
            <span className="badge badge-primary text-primary fs-5">{currentUser}</span>
          </div>
        </div>
      </nav>

      <Outlet />

      <Tooltip place="top" effect="float" id="hometool" />
      <Tooltip place="top" effect="float" id={"catool"} />
      <Tooltip place="top" effect="float" id={"deposittool"} />
      <Tooltip place="top" effect="float" id={"withdrawtool"} />
      <Tooltip place="top" effect="float" id={"userprofiletool"} />
      <Tooltip place="top" effect="float" id={"alldatatool"} />
    </>
  );
};
export default Navigation;
