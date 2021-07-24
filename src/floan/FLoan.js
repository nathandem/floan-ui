import PropTypes from 'prop-types';
import React from 'react';
import { ethers } from "ethers";

import Floan from '../abis/Floan.json';


export default class FLoan extends React.PureComponent {

    state = {
        contract: null,
    };

    componentDidMount = async () => {
        const contract = new ethers.Contract(process.env.REACT_APP_TOKEN_ADDRESS, Floan.abi, this.props.signer);
        this.setState({ contract });

        console.log(await this.props.provider.getBlockNumber());
    }

    getTokenAddress = async () => {
        const tokenAddress = (await this.state.contract.getTokenAddress()).toString();
        console.log(tokenAddress);
    }

    createHardcodedLoanOffer = async () => {
        const principal = 1000;
        const repayment = 1100;
        const duration = 365 * 24 * 60 * 60;
        const validUntil = Date.now() + 7 * 24 * 60 * 60;

        const transaction = await this.state.contract.requestLoan(principal, repayment, duration, validUntil);
        console.log(transaction);
    }

    render() {
        return (
            <div>
                <span>You are logged-in as {this.props.signedAddress}</span>

                <button onClick={this.getTokenAddress}>Get Token Address</button>


                <button onClick={this.createHardcodedLoanOffer}>Create Hard Coded Loan Offer</button>
            </div>
        );
    }
}

FLoan.propTypes = {
    provider: PropTypes.object.isRequired,
    signer: PropTypes.object.isRequired,
    signedAddress: PropTypes.string.isRequired,
};
