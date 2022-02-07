import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import { Card, Form, Button } from 'react-bootstrap';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

const Write = () => {
    const [web3, setWeb3] = useState();
    const [contract, SetContract] = useState();
    const [address, setAddress] = useState();
    const [balanceResult, setBalanceResult] = useState();
    const [sendAmount, setSendAmount] = useState();
    const [recipientAddress, setRecipientAddress] = useState();
    const [getAddress, setGetAddress] = useState('');
    const [getAmount, setGetAmount] = useState('');

    const [tRecipientAddress, setTRecipientAddress] = useState();
    const [tSenderAddress, setTSenderAddress] = useState();
    const [getTAmount, setGetTAmount] = useState('');

    const [tOwner, setTOwner] = useState();


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

    const connect = async () => {
        let web3 = new Web3(window.ethereum);
        let res = await web3.eth.getAccounts()
        setAddress(res[0])
    }

    const Approve = async () => {
        let result = await contract.methods.approve(getAddress, getAmount).send({ from: address });
        console.log(result);
    }
    
    const Transfer = async () => {
        let result = await contract.methods.transfer(recipientAddress, sendAmount).send({ from: address });
        console.log(result);
    }

    const TransferFrom = async () => {
        let result = await contract.methods.transferFrom(tSenderAddress, tRecipientAddress, getTAmount).send({ from: address });
        console.log(result);
    }

    const TransferOwnership = async () => {
        let result = await contract.methods.transferOwnership(tOwner).send({ from: address });
        console.log(result);
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row mt-3">
                    <div className="col flex align-items-center justify-content-center">
                        <Card style={{ height: 330 }}>
                            <Card.Body>
                                <Card.Title>Approve</Card.Title>
                                <Form style={{ width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Spender address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={getAddress} onChange={(e) => setGetAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Amount"
                                            value={getAmount} onChange={(e) => setGetAmount(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className='mb-3' style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-around'}}>
                                    <h5>Please connect to Metamask Account before proceed</h5>
                                        <Button variant="info" type="button" onClick={connect}>
                                            Connect
                                        </Button>
                                    </div>
                                    <Button variant="primary" type="button" onClick={Approve}>
                                        Approve
                                    </Button>
                                </Form>
                                {/* <Card.Text>Allowed Amount: {balanceResult}</Card.Text> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col flex align-items-center justify-content-center">
                        <Card style={{ height: 330 }}>
                            <Card.Body>
                                <Card.Title>Transfer</Card.Title>
                                <Form style={{ width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Recipient Address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={sendAmount} onChange={(e) => setSendAmount(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className='mb-3' style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-around'}}>
                                    <h5>Please connect to Metamask Account before proceed</h5>
                                        <Button variant="info" type="button" onClick={connect}>
                                            Connect
                                        </Button>
                                    </div>
                                    <Button variant="primary" type="button" onClick={Transfer}>
                                        Transfer
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col flex align-items-center justify-content-center">
                        <Card style={{ height: 420 }}>
                            <Card.Body>
                                <Card.Title>Transfer From</Card.Title>
                                <Form style={{ width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Sender address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={tSenderAddress} onChange={(e) => setTSenderAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Recipient address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={tRecipientAddress} onChange={(e) => setTRecipientAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Amount"
                                            value={getTAmount} onChange={(e) => setGetTAmount(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className='mb-3' style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-around'}}>
                                    <h5>Please connect to Metamask Account before proceed</h5>
                                        <Button variant="info" type="button" onClick={connect}>
                                            Connect
                                        </Button>
                                    </div>
                                    <Button variant="primary" type="button" onClick={TransferFrom}>
                                        Transfer
                                    </Button>
                                </Form>
                                {/* <Card.Text>Allowed Amount: {balanceResult}</Card.Text> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col flex align-items-center justify-content-center">
                        <Card style={{ height: 420 }}>
                            <Card.Body>
                                <Card.Title>Transfer Ownership</Card.Title>
                                <Form style={{ width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>New Address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Address"
                                            value={tOwner} onChange={(e) => setTOwner(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className='mb-3' style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-around'}}>
                                    <h5>Please connect to Metamask Account before proceed</h5>
                                        <Button variant="info" type="button" onClick={connect}>
                                            Connect
                                        </Button>
                                    </div>
                                    <Button variant="primary" type="button" onClick={TransferOwnership}>
                                        Change
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write