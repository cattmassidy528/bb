
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "./context";
// import axios from "axios";

function Logout() {
  const { setCurrentUser, setProfileData } = useContext(AccountContext)
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    localStorage.removeItem("token");
    setCurrentUser(null)
    setProfileData(null)
    navigate("/");
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card mx-auto my-auto col-md-8 col-lg-6 col-sm-10 border border-3 border-dark shadow-lg">
        <div className="row d-flex my-auto">
          <div className="card-body d-flex my-auto">
            <div className="container">
              <h2 className="card-title d-flex justify-content-center m-4">
                Are sure you want to log out?
              </h2>
              <div className="d-flex justify-content-center mt-3">
                <button
                  onClick={(e) => handleLogout(e)} className="btn btn-outline-warning btn-success btn-lg shadow-lg" autoFocus>
                  <b>Log out</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
