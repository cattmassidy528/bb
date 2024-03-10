import "./css/home.css";
import bankImg from "./images/bank-clip.png";
// import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "./register";
import Login from "./login";

const Home = () => {
  const [loginOrRegister, setLoginOrRegister] = useState(true);

  return (
    <div className="d-flex justify-content-center">
      <div className="card m-3 mt-4  col-md-8 col-lg-6 col-sm-10 border border-3 border-dark shadow-lg">
        <div className="container ">
          <div className="card-title d-flex justify-content-center">
            <h1>Bad Bank</h1>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={bankImg}
              style={{ height: "6rem" }}
              alt="little bank"
            ></img>
          </div>
          <div>
            <div className="card-body d-flex justify-content-center">
              <h4>for all your !banking needs</h4>
            </div>

            {loginOrRegister && (
              <SignUp
                loginOrRegister={loginOrRegister}
                setLoginOrRegister={setLoginOrRegister}
              />
            )}
            {loginOrRegister === false && (
              <Login
                loginOrRegister={loginOrRegister}
                setLoginOrRegister={setLoginOrRegister}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
