// import React, { useContext, useState } from "react"
// import { AccountContext } from "./context"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios'
// import SignUp from './signup'
// import { Link } from 'react-router-dom'
// import './home.css'

// const CreateAccount = () => {


  
//     const [ tf, setTf ] = useState(false)
//     const { login, setAllUsers } = useContext(AccountContext)
//     const arrayOfWrongs = ['username field empty', 'email field empty', 'password must be at least eight characters or greater']

//     const [ userData, setUserData ] = useState({
//         name: '',
//         email: '',
//         password: '',
//     })

//     const hooray = () => toast.success("Account Created!", {
//         position: 'top-center',
//         closeOnClick: true,
//         theme: 'colored',
//         hideProgressBar: true,
//         autoClose: 3000,
//     })  
  
//     const woops = (arrayOfWrongs) => toast.error(arrayOfWrongs, {
//         position: 'top-center',
//         closeOnClick: true,
//         theme: 'colored',
//         hideProgressBar: true,
//         autoClose: 3000,
//     })  
  
//     const handleAnotherSubmit = (e) => {
//         e.preventDefault();
//         setUserData({
//             name: '',
//             email: '',
//             password: '',
//          })      
//          setTf(false)  
//     }
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // if(userData.name.length === 0) {
//         //     setTf(false)
//         //     woops(arrayOfWrongs[0])
//         // }
//         // if(userData.email.length === 0) {
//         //     setTf(false)
//         //     woops(arrayOfWrongs[1])
//         // }
//         // if (userData.password.length < 0) {
//         //     setTf(false)
//         //     woops(arrayOfWrongs[2])
//         // } 

//         if (userData.name.length >= 1 && userData.email.length >= 1 && userData.password.length > 0) {
    
//         setTf(true)
//         login(userData)
//         setAllUsers((prevAllUsers) => {
//           return [...prevAllUsers, userData]
//         })
//         hooray()
        
//         try {
//           const jsonData = JSON.stringify(userData)
//           console.log(jsonData)
//           const response = await axios.post('http://localhost:5000/api/profile', jsonData, {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });

//           console.log(response.data)
              
//         } catch (error) {
//           console.error('Error during registration:', error);
//         }                
//       }
//     }


//     const handleFormChange = (e) => {
//         const { name, value } = e.target
//         setUserData((prevData) => ({
//             ...prevData, [name]: value,
//         }));
//     }

//     return (
//         <div className="d-flex justify-content-center mt-4">
//         <div className="card mx-auto my-auto col-md-8 col-lg-6 col-sm-10 border border-3 border-dark shadow-lg">
//             <div className="row d-flex my-auto">
//             <div className="card-body d-flex my-auto">
//                 <div className="container">
//                 <h1 className="card-title d-flex justify-content-center m-4">Create Account</h1>
//                     <form onSubmit={(e) => handleSubmit(e)}>
//                         <div className="form-group ms-5 me-5">
//                             <div className="m-3">
//                                 <input className="form-control border border-2 border-secondary shadow-lg" type="text" name="name" value={userData.name} onChange={(e) => handleFormChange(e)} placeholder="name" />
//                             </div>
//                             <div className="m-3">

//                                 <input className="form-control border border-2 border-secondary shadow-lg" type="text" name="email" value={userData.email} onChange={(e) => handleFormChange(e)} placeholder="email" />
//                             </div>
//                             <div className="m-3">
//                                 <input className="form-control border border-2 border-secondary shadow-lg" type="password" name="password" value={userData.password} onChange={(e) => handleFormChange(e)} placeholder="password" />
//                             </div>
//                         </div>
//                         {tf === false && 
//                         <div className="d-flex justify-content-center">
//                             <button className="btn btn-dark m-1 shadow-lg" type="submit"><b>Create Account</b></button>
//                         </div>
//                         }
//                     </form>
//                 </div>
//             </div>
//             </div>
            
//         {tf &&  (
//             <>
//             <div className="col">
//               <form >

//                 <div className="container">

//                 <div className="d-flex justify-content-center">Thank you for joining our bank,&nbsp; <span style={{ color: 'green'}}> {userData.name}!</span></div>
            
//                     <div className="d-flex justify-content-center"> 
//                       <button type="submit" className="btn btn-dark shadow-lg m-3" onClick={(e) => handleAnotherSubmit(e)}><b>Create Another Account</b></button>
//                     </div>
//                     <div className="d-flex justify-content-center">
//                       <button className="btn btn-dark ms-3 shadow shadow-lg" style={{ textDecoration: 'none', }}><Link to="/visitable/login" className="m-3 p-3" style={{ textDecoration: 'none', color: 'white',}}><b>Take me to Login</b></Link></button>
                    
//                     </div>

//                 </div>
//               </form>
//             </div>
//             </>
//         )
//         }
//         </div>
//         {/* <ToastContainer/> */}
//         <ToastContainer  toastStyle={{border: '4px solid peachpuff'}}/>

//         </div>        
//     )
// }

// export default CreateAccount;
