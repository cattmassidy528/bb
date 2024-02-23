import React, { useEffect, useState, useContext } from "react";
import { AccountContext } from "./context";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userBal, setCurrentUser, currentUser, profileData, setProfileData } = useContext(AccountContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const params = useParams();


  // const userDataString = localStorage.getItem('currentUser');
  // setCurrentUser(JSON.parse(userDataString))



  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    }
    if (currentUser) {
      console.log("profilejs useEffect currentUser: " + currentUser)
    }

  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/auth/profile/${currentUser}`, {
            headers: { Authorization: token }
          });
          setLoading(false); // Set loading to false after data is fetched
          setProfileData(response.data); // Set profile data to the response data object

        } catch (error) {
          console.error('Error fetching profile data:', error);
          setError('An error occurred while fetching profile data. Please try again later.');
          setLoading(false); // Set loading to false in case of error
        }
      };
      fetchProfile();
    }
  }, [currentUser, setProfileData]);

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error state
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card mx-auto my-auto col-md-8 col-lg-6 col-sm-10 border border-3 border-dark shadow-lg">
        <div className="row d-flex my-auto">
          <div className="card-body d-flex my-auto">
            <div className="container">
              <h1 className="card-title d-flex justify-content-center m-4">
                username: {profileData.user.username}
              </h1>
              <div className="fs-3">
                Here's your userBal: ${userBal}
              </div>
              {profileData && (
                <div className="fs-3">
                  <div>

                    email: {profileData.user.email}
                  </div>
                  <div>
                    profile balanceeee: {profileData.user.balance}

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
