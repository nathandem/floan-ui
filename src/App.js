import React from 'react';
import { ethers } from "ethers";

import './App.css';


export default class App extends React.PureComponent {

    state = {
        provider: null,
        signer: null,
        signedAddress: null,
    };

    componentDidMount = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.setState({ provider }, async () => {
            if (await this._isMetaMaskAccountConnected()) {
                const signer = this.state.provider.getSigner();
                const signedAddress = await signer.getAddress();
                this.setState({ signedAddress, signer });
            }
        });

        // later:
        // 1. show error message if `ethereum.isMetaMask` is false => https://docs.metamask.io/guide/ethereum-provider.html
        // 2. on account or chain change, reload the page (https://docs.metamask.io/guide/ethereum-provider.html#events)
        // 3. allow user to disconnect their account
    }

    _isMetaMaskAccountConnected = async () => {
        // note: provider.getSigner() always returns a signer, so `listAccounts` is the only way
        const accounts = await this.state.provider.listAccounts();
        return accounts.length > 0;
    }

    connectWallet = async () => {
        // Command to prompt the user to connect his account with metamask
        await this.state.provider.send("eth_requestAccounts", []);
        const signer = this.state.provider.getSigner();
        const signedAddress = await signer.getAddress();

        this.setState({ signedAddress, signer });
    }

    render() {
        return (
            <div className="App__container">
                {!this.state.signer ?
                    <button onClick={this.connectWallet}>Connect wallet</button> :
                    <span>You are logged-in as {this.state.signedAddress}</span>
                }
            </div>
        );
    }
}

// IN FLOAN COMPONENT
// ------------------
// ethers.Contract can be instantiated with both a provider or a signer as the 3rd argument
// if it's a provider, the contract is limited to read-only actions
// with a signer, the contract can write
// const contract = new ethers.Contract(TOKEN_ADDRESS, Token.abi, signer);

// console.log(await provider.getBlockNumber());
