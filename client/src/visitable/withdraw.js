
import React, { useContext, useState } from 'react'
import { AccountContext } from './context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Withdraw = () => {
    const { userBal, taketh }  = useContext(AccountContext)
    const [withdrawAmount, setWithdrawAmount] = useState('')

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
        if(withdrawAmount > userBal || withdrawAmount <= 0) {
            nope()
            setWithdrawAmount('')
            return null
        }
        yup()
        taketh(Number(withdrawAmount))
        setWithdrawAmount('')

    }
    const handleInputChange = (e) => {
        setWithdrawAmount(e.target.value)
    }

    return (
        <div className='d-flex justify-content-center mt-4'>

        <div className='card col-lg-6 col-md-8 col-sm-6 shadow-lg border border-3 border-dark bg-light'>
            <div className='card-body'>
                <div className='container  d-flex justify-content-center'>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1 className='card-title d-flex justify-content-center mb-3'>Withdraw</h1>
                    <h4 className='ms-3'>User Balance: ${userBal}.00</h4>
                    <label className='m-2'>enter withdrawal amount below:</label>
                    <input type='number' value={withdrawAmount} onChange={(e) => handleInputChange(e)} placeholder='$0.00...' className='form-control shadow-lg border border-2 border-secondary'/>
                    
                    <div className='d-flex justify-content-center mt-3'>
                        <button className='btn btn-dark shadow-lg' type='submit'><b>submit</b></button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        <ToastContainer  toastStyle={{border: '4px solid peachpuff'}}/>

        </div>
    )
}

export default Withdraw