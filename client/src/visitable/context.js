import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // const [userBal, setUserBal] = useState(0);
  // const [pastBal, setPastBal] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState([])
  const [balance, setBalance] = useState(0);




  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/auth/profile/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfileData(response.data)
        } catch (error) {
          console.error('Error fetching balance data (context - useEffect): ', error);
        }
      };
      fetchProfile();
    }
  }, [currentUser, setProfileData]);

  const login = (userData) => {
    setUser(userData);
    setAllUsers((prevAllUsers) => {
      return [...prevAllUsers, user];
    });
  };
  // const giveth = (n) => {
  //   setUserBal(userBal + n);
  //   setPastBal((prevPastBal) => {
  //     return [...prevPastBal, userBal];
  //   });
  // };
  // const taketh = (n) => {
  //   setUserBal(userBal - n);
  //   setPastBal((prevPastBal) => {
  //     return [...prevPastBal, userBal];
  //   });
  // };

  const contextValue = {
    setBalance,
    balance,
    profileData,
    setProfileData,
    currentUser,
    setCurrentUser,
    // userBal,
    // giveth,
    // pastBal,
    // taketh,
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
