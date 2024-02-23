import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './context';

const AllData = () => {
  const { allUsers, userBal, pastBal } = useContext(AccountContext);

  const [currentPastBal, setCurrentPastBal] = useState(pastBal);


  useEffect(() => {
    setCurrentPastBal(pastBal);
  }, [pastBal]);

  return (
    <div>
      <div className='d-flex justify-content-center m-2 mt-5 '>
        <div className="card col-md-8 col-lg-6 col-sm-10 border border-3 border-dark shadow-lg">
          <div className='card-header d-flex justify-content-center'>Created Accounts</div>
          <div className='card-body '>
            <table className='table table-striped '>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => {
                  if (index === 0) {
                    return null
                  }
                  return (
                    <tr key={index}>
                      <th scope='row'>{index}</th>
                      <td>{JSON.stringify(user.name)}</td>
                      <td>{JSON.stringify(user.email)}</td>
                      <td>{JSON.stringify(user.password)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center m-2 mt-5'><ul style={{ display: 'inline-block' }}><li ></li></ul><ul style={{ display: 'inline-block' }}><li></li></ul><ul style={{ display: 'inline-block' }}><li></li></ul></div>

      <div className='d-flex justify-content-center m-2 mb-5 pb-2 mt-5'>
        <div className="card col-md-8 col-lg-6 col-sm-10 border border-3 border-dark shadow-lg">
          <div className='card-header d-flex justify-content-center '>Balance Data</div>
          <div className='card-body'>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope="col">Transaction</th>
                  <th scope="col">Previous</th>
                  <th scope="col"></th>

                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>

                {currentPastBal.map((bal, index) => {
                  if (index === 0) {
                    return null
                  }
                  const elseZero = index === 0 ? 0 : currentPastBal[index - 1]
                  const symbol = index === 0 ? bal > currentPastBal[index - 1] ? '+' : '-' : bal > currentPastBal[index - 1] ? '+' : '-'
                  const operand = symbol === "+" ? currentPastBal[index] - currentPastBal[index - 1] : currentPastBal[index] - currentPastBal[index - 1]

                  return (
                    <tr key={index}>
                      <th scope='row'>{index}</th>

                      <td>{elseZero}</td>
                      <td>{symbol}</td>
                      <td>{Math.abs(operand)}</td>
                      <td>=</td>
                      <td>{elseZero > currentPastBal[index - 1] ? JSON.stringify(elseZero - operand) : JSON.stringify(elseZero + operand)}</td>
                    </tr>
                  )
                })}
                <tr><td><b>most recent</b></td>
                  <td>{JSON.stringify(currentPastBal[currentPastBal.length - 1])}</td>
                  <td>{userBal > currentPastBal[currentPastBal.length - 1] ? '+' : '-'}</td>
                  <td>{JSON.stringify(Math.abs(userBal - currentPastBal[currentPastBal.length - 1]))}</td>
                  <td>=</td>
                  <td><b>final total : {JSON.stringify(userBal)} </b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

  );
}

export default AllData;
