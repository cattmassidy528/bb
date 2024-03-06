import React, { useState, createContext, useEffect } from "react";
import axios from 'axios';
export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userBal, setUserBal] = useState(0);
  const [pastBal, setPastBal] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState([])
  const [balance, setBalance] = useState(0); // Initialize balance to 0

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/auth/profile/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log("contextjs response.data: " + response.data.user.username);
          setProfileData(response.data)

        } catch (error) {
          console.error('Error fetching balance data (context - useEffect): ', error);
        }
      };
      fetchProfile();
    }
  }, [currentUser, setProfileData]);


  ///// REGISTER USER ////////// REGISTER USER ////////// REGISTER USER /////  
  // const registerUser = (userData) => {
  //   setUser(userData)
  //   setAllUsers((prevAllUsers) => {
  //     return [...prevAllUsers, user];
  //   });
  // }
  ///// LOGIN ////////// LOGIN ////////// LOGIN /////
  const login = (userData) => {
    setUser(userData);
    setAllUsers((prevAllUsers) => {
      return [...prevAllUsers, user];
    });
    console.log("currentUser login func in context line 53" + currentUser)
  };
  ///// GIVETH ////////// GIVETH ////////// GIVETH /////
  const giveth = (n) => {
    setUserBal(userBal + n);
    setPastBal((prevPastBal) => {
      return [...prevPastBal, userBal];
    });
  };
  ///// TAKETH ////////// TAKETH ////////// TAKETH /////
  const taketh = (n) => {
    setUserBal(userBal - n);
    setPastBal((prevPastBal) => {
      return [...prevPastBal, userBal];
    });
  };

  const contextValue = {
    setBalance,
    balance,
    profileData,
    setProfileData,
    // registerUser,
    currentUser,
    setCurrentUser,
    userBal,
    giveth,
    pastBal,
    taketh,
    user,
    setAllUsers,
    allUsers,
    login,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
export default AccountContextProvider;
