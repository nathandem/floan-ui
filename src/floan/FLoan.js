import PropTypes from 'prop-types';
import React from 'react';
import { ethers } from "ethers";

import FloanContract from '../abis/Floan.json';

import CreateLoan from './CreateLoan';
import Home from './Home';


const VIEWS = {
    HOME: 'home',
    CREATE_LOAN: 'create_loan',
    LIST_LOANS: 'list_loans',
};

export default class FLoan extends React.PureComponent {

    state = {
        contract: null,
        activeView: VIEWS.HOME,
    };

    componentDidMount = async () => {
        const contract = new ethers.Contract(process.env.REACT_APP_TOKEN_ADDRESS, FloanContract.abi, this.props.signer);
        this.setState({ contract });
    }

    // change view

    goToCreateLoanView = () => {
        this.setState({ activeView: VIEWS.CREATE_LOAN });
    }

    goToListLoansView = () => {
        this.setState({ activeView: VIEWS.LIST_LOANS });
    }

    goToHomeView = () => {
        this.setState({ activeView: VIEWS.HOME });
    }

    // interactions with the smart contract

    createLoanOffer = async (principal, repayment, duration, ttl) => {
        const transaction = await this.state.contract.requestLoan(principal, repayment, duration, ttl);
        console.log(transaction);

        alert('Loan properly created!');
        this.goToHomeView();
    }

    createLoanOffer = async (principal, repayment, duration, ttl) => {
        const transaction = await this.state.contract.requestLoan(principal, repayment, duration, ttl);
        console.log(transaction);

        alert('Loan properly created!');
        this.goToHomeView();
    }

    render() {
        let activeView;
        if (this.state.activeView === VIEWS.HOME) {
            activeView = <Home
                goToCreateLoanView={this.goToCreateLoanView}
                goToListLoansView={this.goToListLoansView}
                signedAddress={this.props.signedAddress}
            />;
        } else if (this.state.activeView === VIEWS.CREATE_LOAN) {
            activeView = <CreateLoan
                goToHomeView={this.goToHomeView}
                createLoanOffer={this.createLoanOffer}
            />;
        } else if (this.state.activeView === VIEWS.LIST_LOANS) {
            activeView = <ListLoans
                goToHomeView={this.goToHomeView}
                loans={loans}
            />;
        }

        return (
            <div>
                {activeView}
                {/* <button onClick={this.getTokenAddress}>Get Token Address</button>
                <button onClick={this.createHardcodedLoanOffer}>Create Hard Coded Loan Offer</button> */}
            </div>
        );
    }
}

FLoan.propTypes = {
    provider: PropTypes.object.isRequired,
    signer: PropTypes.object.isRequired,
    signedAddress: PropTypes.string.isRequired,
};
