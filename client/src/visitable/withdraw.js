
import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Withdraw = () => {
    const { taketh, currentUser, setCurrentUser, profileData, setProfileData } = useContext(AccountContext)
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [withdrawError, setWithdrawError] = useState(null)
    const [usingTotal, setUsingTotal] = useState(true)
    const [total, setTotal] = useState([])
    const navigate = useNavigate();

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
    }, [currentUser, setCurrentUser]);

    useEffect(() => {
        console.log(currentUser)
        console.log("total: " + total)
    })

    useEffect(() => {
        if (currentUser) {
            const fetchProfileTotal = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:5000/api/auth/profile/${currentUser}/total`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setTotal(response.data.user.balance);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                    console.error('An error occurred while fetching profile data. Please try again later.');
                }
            };
            fetchProfileTotal();
        }
    }, [currentUser, setProfileData, total]);

    const yup = () => toast.success("withdraw successful! :)", {
        position: 'top-center',
        closeOnClick: true,
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,

    })

    const nope = () => toast.error("withdraw unsuccessful. :(", {
        position: 'top-center',
        closeOnClick: true,
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (withdrawAmount > total || withdrawAmount <= 0) {
            nope()
            // setWithdrawAmount('')
            return null
        }

        yup()
        taketh(withdrawAmount)

        const withdrawCall = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`http://localhost:5000/api/auth/profile/${currentUser}/withdraw`,
                    { currentUser, withdrawAmount }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfileData(response.data)
                setUsingTotal(false)
            } catch (error) {
                console.log("withdrawAmount in withdrawcall error: " + withdrawAmount)
                console.error('Error making deposit (deposit.js - axios call): ', error);
                setWithdrawError('An error occurred while making withdraw. get rekt lmao.');
            }
        };
        withdrawCall();
        // setWithdrawAmount('')

    }

    const handleInputChange = (e) => {
        setWithdrawAmount(e.target.value)
    }
    if (withdrawError) {
        return <div>{withdrawError}</div>;
    }

    return (
        <div className='d-flex justify-content-center mt-4'>

            <div className='card col-lg-6 col-md-8 col-sm-6 shadow-lg border border-3 border-dark bg-light'>
                <div className='card-body'>
                    <div className='container  d-flex justify-content-center'>

                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h1 className='card-title d-flex justify-content-center m-3 mb-3'>Withdraw</h1>
                            {usingTotal &&
                                <h4 className='m-3'>User Balance: ${total}.00</h4>
                            }
                            {usingTotal === false &&
                                <h4 className='m-3'>User Balance: ${profileData.balance}.00</h4>
                            }
                            <label className='m-2 d-flex justify-content-center'>enter withdrawal amount below:</label>
                            <input type='number' value={withdrawAmount} onChange={(e) => handleInputChange(e)} placeholder='$0.00...' className='form-control shadow-lg border border-2 border-secondary' autoFocus />

                            <div className='d-flex justify-content-center mt-3'>
                                <button className='btn btn-outline-warning btn-success btn-lg shadow-lg' type='submit'><b>submit</b></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer toastStyle={{ border: '4px solid peachpuff' }} />

        </div>
    )
}

export default Withdraw
