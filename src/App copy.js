import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

function App() {
  const [web3, setWeb3] = useState();
  const [contract, SetContract] = useState();
  const [address, setAddress] = useState();
  const [getAddress, setGetAddress] = useState('');
  const [getAmount, setGetAmount] = useState('');

  useEffect(() => {
    // loadData();
    if (window.ethereum) {
      window.ethereum.enable();
      let web3 = new Web3(window.ethereum);
      console.log(web3.currentProvider)
      setWeb3(web3);
      const contract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
      SetContract(contract)

      let res = web3.eth.getAccounts()
      setAddress(res[0])
    }
  }, []);

  // async function loadData(){
  //   const web3 = new Web3(window.ethereum);
  //   setWeb3(web3);
  //   const contract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
  //   SetContract(contract)
  // }
  const connect = async () => {
    let web3 = new Web3(window.ethereum);
    let res = await web3.eth.getAccounts()
    setAddress(res[0])
  }
  const Approve = async () => {
    console.log("getAddress", getAddress);
    let result = await contract.methods.approve(getAddress, getAmount).send({ from: address});
  }

  return (
    <>
      <div className='demo'>
      <div className="container mt-5">
        <div className="row">
          <div className="col flex flex-column align-items-center justify-content-start">
            <h1>ERC20 Token Demo Website</h1>
            <h3>Check out the methods</h3>
            <LinkContainer to="/read"><button className='btn btn-primary'>Get Started</button></LinkContainer>
          </div>
          <div className="col" />
        </div>
      </div>
      </div>
       {/*  <button className='btn btn-primary' onClick={connect}>Connect</button>
      <div>
        address: <input value={getAddress} onChange={(e) => setGetAddress(e.target.value)}></input>
      </div>
      <div>
        amount: <input value={getAmount} onChange={(e) => setGetAmount(e.target.value)}></input>
      </div>
      <button onClick={Approve}>Approve</button> */}
      </>
    )
}

      export default App;