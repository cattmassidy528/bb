
import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Deposit = () => {

    const { giveth, currentUser, setCurrentUser, setUserBal, setProfileData, profileData } = useContext(AccountContext)
    const [depositAmount, setDepositAmount] = useState('')
    const [depositError, setDepositError] = useState(null)

    useEffect(() => {
        if (!currentUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
            console.log("currentUser in depositjs useEffect: " + currentUser)
        }
    }, [currentUser, setCurrentUser]);


    const yup = () => toast.success("deposit successful! :)", {
        position: 'top-center',
        closeOnClick: true,
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
    })

    const nope = () => toast.error("deposit unsuccessful. :(", {
        position: 'top-center',
        closeOnClick: true,
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (depositAmount <= 0) {
            nope()
            return null
        }
        yup()
        giveth(depositAmount)

        const depositCall = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`http://localhost:5000/api/auth/profile/${currentUser}/deposit`,
                    { currentUser, depositAmount }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfileData(response.data)
            } catch (error) {
                console.log("depositAmount in depositcall error: " + depositAmount)
                console.error('Error making deposit (deposit.js - axios call): ', error);
                setDepositError('An error occurred while making deposit. get rekt lmao.');
            }
        };
        depositCall();


    }
    const handleInputChange = (e) => {
        setDepositAmount(e.target.value)
    }
    if (depositError) {
        return <div>{depositError}</div>;
    }

    return (
        <div className='d-flex justify-content-center mt-4'>

            <div className='card col-lg-6 col-md-8 col-sm-6 shadow-lg border border-3 border-dark bg-light '>
                <div className='card-body'>
                    <div className='container  d-flex justify-content-center'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h1 className='card-title d-flex justify-content-center mb-3'>Deposit</h1>
                            <h4 className='ms-3'>User Balance: ${profileData.balance}.00</h4>
                            {/* <h4 className='ms-3'>User Balance: ${profileData.user.balance}.00</h4> */}

                            <label className='m-2'>enter deposit amount below:</label>
                            <input type='number' value={depositAmount} onChange={(e) => handleInputChange(e)} placeholder='$0.00...' className='form-control shadow-lg border border-2 border-secondary' autoFocus />

                            <div className='d-flex justify-content-center mt-3'>
                                <button className='btn btn-dark shadow-lg' type='submit'><b>submit</b></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer toastStyle={{ border: '4px solid peachpuff' }} />
        </div>
    )
}

export default Deposit
