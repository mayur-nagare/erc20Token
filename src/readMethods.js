import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import { Card, Form, Button } from 'react-bootstrap';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

const Read = () => {
    const [web3, setWeb3] = useState();
    const [contract, SetContract] = useState();
    const [address, setAddress] = useState();
    const [balanceResult, setBalanceResult] = useState();
    const [allowanceResult, setAllowanceResult] = useState();
    const [ownerAddress, setOwnerAddress] = useState();
    const [spenderAddress, setSpenderAddress] = useState();

    useEffect(() => {
        let web3 = new Web3(window.ethereum);
        console.log(web3.currentProvider)
        setWeb3(web3);
        const contract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
        SetContract(contract)
    }, []);

    const Allow = async () => {
        // console.log("getAddress", getAddress);
        let result = await contract.methods.allowance(ownerAddress, spenderAddress).call();
        setAllowanceResult(result)
    }
    const getBalance = async () => {
        // console.log("getAddress", getAddress);
        let res = await contract.methods.balanceOf(address).call();
        setBalanceResult(res);
    }

    return (
        <div>
            {console.log("contract", contract)}
            <div className="container mt-5">
                <div className="row">
                    <div className="col flex align-items-center justify-content-center">
                        <Card style={{ height: 310 }}>
                            <Card.Body>
                                <Card.Title>Allowance</Card.Title>
                                <Form style={{ width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Owner address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={ownerAddress} onChange={(e) => setOwnerAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Spender address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={spenderAddress} onChange={(e) => setSpenderAddress(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="button" onClick={Allow}>
                                        Submit
                                    </Button>
                                </Form>
                                <Card.Text>Allowed Amount: {allowanceResult}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col flex align-items-center justify-content-center">
                        <Card style={{ height: 310 }}>
                            <Card.Body>
                                <Card.Title>BalanceOf</Card.Title>
                                <Form style={{ width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control 
                                            placeholder="Enter Address"
                                            value={address} onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Spender address</Form.Label>
                                        <Form.Control placeholder="Enter Address" />
                                    </Form.Group> */}
                                    <Button variant="primary" type="button" onClick={getBalance}>
                                        Submit
                                    </Button>
                                </Form>
                                <Card.Text>Balance: {balanceResult}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Read