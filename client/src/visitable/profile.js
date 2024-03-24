import React, { useEffect, useState, useContext } from "react";
import { AccountContext } from "./context";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { setCurrentUser, currentUser, /*profileData, setProfileData,*/ API } = useContext(AccountContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  })

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    }
  }, [params.username, currentUser, setCurrentUser]);
  useEffect(() => {
    if (profileData) {
      setLoading(false);
    }
    else {
      setError('An error occurred while fetching profile data. Please try again later.');

    }

  }, [profileData])

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await API.get(`/api/auth/profile/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setLoading(false); // Set loading to false after data is fetched
          setProfileData(response.data); // Set profile data to the response data object
        } catch (error) {
          setError('An error occurred while fetching profile data. Please try again later.');
          setLoading(false); // Set loading to false in case of error
        }
      };
      fetchProfile();
    }
  }, [currentUser, setProfileData, API]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
              <div className='d-flex justify-content-center'><ul style={{ display: 'inline-block' }}><li ></li></ul><ul style={{ display: 'inline-block' }}><li></li></ul><ul style={{ display: 'inline-block' }}><li></li></ul></div>

              {profileData && (
                <div className="p-3">
                  <div className="fs-4">
                    profile balance:<b className="ps-1"> ${profileData.user.balance}.00 </b>
                  </div>

                  <div className="fs-4">
                    email: <b className="ps-1">{profileData.user.email}</b>
                  </div>

                  <div className="fs-4">
                    account id: <b className="ps-1">{JSON.stringify(profileData.user._id).slice(12).replace('"', '')} </b>
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
