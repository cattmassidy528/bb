import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ loginOrRegister, setLoginOrRegister }) => {
  const [tf, setTf] = useState(false);
  const { login, setAllUsers, setCurrentUser, currentUser } = useContext(AccountContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("already logged in");
    }

    if (currentUser) {
      navigate(`/visitable/profile/${currentUser}`);
    }
  }, [currentUser, navigate]);

  const arrayOfLoginWrongs = [
    "username field empty or not in database or some other reason i can't remember.",
    "password must be at least eight characters",
  ];

  const woops = (arrayOfLoginWrongs) =>
    toast.error(arrayOfLoginWrongs, {
      position: "top-center",
      closeOnClick: true,
      theme: "colored",
      hideProgressBar: true,
      autoClose: 3000,
    });

  const hooray = () =>
    toast.success("Log in successful!!", {
      position: "top-center",
      closeOnClick: true,
      theme: "colored",
      hideProgressBar: true,
      autoClose: 3000,
    });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClearForm = (e) => {
    e.preventDefault();
    setUserData({
      ...userData
    })
  }



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (userData.username.length === 0) {
      setTf(false);
      woops(arrayOfLoginWrongs[0]);
    }

    if (userData.password.length <= 8) {
      setTf(false);
      woops(arrayOfLoginWrongs[1]);
      handleClearForm(e)
    }

    if (userData.username.length >= 1 && userData.password.length > 8) {
      setTf(true);
      login(userData);
      setAllUsers((prevAllUsers) => {
        return [...prevAllUsers, userData];
      });

      try {
        const response = await axios.post(
          `/api/auth/login`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          // localStorage.setItem('userData', JSON.stringify(userData));
          setCurrentUser(response.data.user.username);
          localStorage.setItem('currentUser', JSON.stringify(response.data.user.username));
          hooray();
          navigate(`/visitable/profile/${response.data.user.username}`);
        }
      } catch (error) {
        woops(arrayOfLoginWrongs[0]);
        console.error("Error during Login:", error);
      }
    }
  };

  const handleChangeToSignup = (e) => {
    e.preventDefault();
    setLoginOrRegister(true);
  };

  return (
    <div className="d-flex justify-content-center p-2">
      <div className="card mx-auto my-auto col-md-12 col-lg-12 col-sm-12" style={{ border: "none" }}>
        <div className="d-flex justify-content-center fs-5">returning customers sign in below</div>
        <div className="row d-flex my-auto">
          <div className="card-body d-flex my-auto">
            <div className="container ">
              <h1 className="card-title d-flex justify-content-center ">
                Login
              </h1>
              <form onSubmit={(e) => handleLoginSubmit(e)}>
                <div className="form-group ms-5 me-5">
                  <div className="m-3">
                    <input
                      className="form-control border border-2 border-secondary shadow-lg"
                      type="text"
                      name="username"
                      autoComplete="username"
                      value={userData.username}
                      onChange={(e) => handleFormChange(e)}
                      placeholder="username"
                      autoFocus
                    />
                  </div>
                  <div className="m-3">
                    <input
                      className="form-control border border-2 border-secondary shadow-lg"
                      type="password"
                      name="password"
                      autoComplete="off"
                      value={userData.password}
                      onChange={(e) => handleFormChange(e)}
                      placeholder="password"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p>
                      first time here?{" "}
                      <Link onClick={(e) => handleChangeToSignup(e)}>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-warning btn-success btn-lg shadow-lg" type="submit">
                    <b>Log In</b>
                  </button>
                </div>
                {tf && <div className="d-flex justify-content-center"></div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toastStyle={{ border: "4px solid peachpuff" }} />
    </div>
  );
};

export default Login;
