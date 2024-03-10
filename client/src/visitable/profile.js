import React, { useEffect, useState, useContext } from "react";
import { AccountContext } from "./context";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { setCurrentUser, currentUser, profileData, setProfileData } = useContext(AccountContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  })

  useEffect(() => {
    if (currentUser) {
      console.log("profilejs useEffect currentUser: " + currentUser)
    }
    if (!currentUser) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    }
  }, [params.username, currentUser, setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/auth/profile/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setLoading(false); // Set loading to false after data is fetched
          setProfileData(response.data); // Set profile data to the response data object
          console.log(localStorage.getItem('token'))
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
                welcome, {profileData.user.username}!
              </h1>


              {profileData && (
                <div className="fs-3">
                  <div>
                    profile balance: ${profileData.user.balance}.00
                  </div>
                  <div>
                    email: {profileData.user.email}
                  </div>
                  <div>
                    account id: {JSON.stringify(profileData.user._id).slice(12).replace('"', '')}
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
