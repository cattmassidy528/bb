import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = ({ loginOrRegister, setLoginOrRegister }) => {
  const [tf, setTf] = useState(false);
  const { login, setAllUsers } = useContext(AccountContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {

      console.log("token at register/login: " + token)
    }

  }, [token,])

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const arrayOfRegisterWrongs = [
    "username field empty",
    "email field empty",
    "password must be at least eight characters or greater",
    "username already taken!",
  ];



  const woops = (arrayOfRegisterWrongs) =>
    toast.error(arrayOfRegisterWrongs, {
      position: "top-center",
      closeOnClick: true,
      theme: "colored",
      hideProgressBar: true,
      autoClose: 3000,
    });

  const hooray = () =>
    toast.success("Account Created!", {
      position: "top-center",
      closeOnClick: true,
      theme: "colored",
      hideProgressBar: true,
      autoClose: 3000,
    });

  const handleClearFormSubmit = (e) => {
    e.preventDefault();
    setUserData({
      username: "",
      email: "",
      password: "",
    });
    setTf(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (userData.username.length === 0) {
      setTf(false);
      woops(arrayOfRegisterWrongs[0]);
    }
    if (userData.email.length === 0) {
      setTf(false);
      woops(arrayOfRegisterWrongs[1]);
    }
    if (userData.password.length < 8) {
      setTf(false);
      woops(arrayOfRegisterWrongs[2]);
    }

    if (
      userData.username.length >= 1 &&
      userData.email.length >= 1 &&
      userData.password.length > 8
    ) {
      setTf(true);
      login(userData);
      setAllUsers((prevAllUsers) => {
        return [...prevAllUsers, userData];
      });

      try {
        const response = await axios.post(
          `/api/auth/register`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        hooray();
        console.log(response.data);
      } catch (error) {
        setTf(false);
        woops(arrayOfRegisterWrongs[3]);
        handleClearFormSubmit(e);
      }
    }
  };

  const handleChangeToLogin = (e) => {
    e.preventDefault();
    setLoginOrRegister(false);
  };

  return (
    <div className="d-flex justify-content-center pt-1">
      <div className="card mx-auto my-auto col-md-12 col-lg-12 col-sm-12" style={{ border: "none" }}>
        <div className="d-flex justify-content-center fs-5">new customers sign up below</div>
        <div className="row d-flex my-auto">
          <div className="card-body d-flex my-auto">
            <div className="container ">
              <h1 className="card-title d-flex justify-content-center ">
                Sign Up
              </h1>
              <form onSubmit={(e) => handleSignupSubmit(e)}>
                <div className="form-group ms-5 me-5">
                  <div className="m-3 ">
                    <input className="form-control border border-2 border-secondary shadow-lg" type="text" name="username" autoComplete="username" value={userData.username} onChange={(e) => handleFormChange(e)} placeholder="username" autoFocus
                    />
                  </div>
                  <div className="m-3">
                    <input className="form-control border border-2 border-secondary shadow-lg" type="text" name="email" autoComplete="email" value={userData.email} onChange={(e) => handleFormChange(e)} placeholder="email"
                    />
                  </div>
                  <div className="m-3">
                    <input className="form-control border border-2 border-secondary shadow-lg" type="password" name="password" autoComplete="off" value={userData.password} onChange={(e) => handleFormChange(e)} placeholder="password"
                    />
                  </div>
                </div>
                {tf === false && (
                  <div className="d-flex justify-content-center">
                    <p>
                      returning customer?{" "}
                      <Link onClick={(e) => handleChangeToLogin(e)}>Login</Link>
                    </p>
                  </div>
                )}
                {tf === false && (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-warning btn-success btn-lg shadow-lg" type="submit">
                      <b>Sign Up</b>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        {tf && (
          <>
            <div className="col">
              <form onSubmit={(e) => handleChangeToLogin(e)}>
                <div className="container">
                  <div className="d-flex justify-content-center fs-4 p-1">
                    Thank you for joining our bank,&nbsp;{" "}
                    <span style={{ color: "green" }}>
                      {" "}
                      {userData.username}!
                    </span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-outline-warning btn-success btn-lg shadow-lg m-2" onClick={(e) => handleChangeToLogin(e)} autoFocus>
                      <b>Take me to Login</b>
                    </button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-warning btn-success btn-lg shadow-lg m-2 mb-4" onClick={(e) => handleClearFormSubmit(e)}>
                      <b>Create Another Account</b>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <ToastContainer toastStyle={{ border: "4px solid peachpuff" }} />
    </div>
  );
};

export default SignUp;
