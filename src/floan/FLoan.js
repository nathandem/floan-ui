import PropTypes from 'prop-types';
import React from 'react';
import { ethers } from "ethers";

import floanAbi from '../abis/floan.json';
import erc20Abi from '../abis/erc20.json';

import CreateLoan from './CreateLoan';
import OpenLoanList from './OpenLoanList';
import Home from './Home';

import { getLoans } from '../helpers/theGraph';


const VIEWS = {
    HOME: 'home',
    CREATE_LOAN: 'create_loan',
    LIST_LOANS: 'list_loans',
};

export default class FLoan extends React.PureComponent {

    state = {
        floanContract: null,  // ethers.js Contract entity for floan
        daiContract: null,  // ethers.js Contract entity for dai
        activeView: VIEWS.HOME,
        loans: [],
    };

    componentDidMount = async () => {
        const floanContract = new ethers.Contract(process.env.REACT_APP_FLOAN_ADDRESS, floanAbi, this.props.signer);

        // Get DAI ERC20 address
        const daiAddress = await floanContract.getTokenAddress();
        const daiContract = new ethers.Contract(daiAddress, erc20Abi, this.props.signer);

        this.setState({ daiContract, floanContract });
    }

    // change view

    goToCreateLoanView = () => {
        this.setState({ activeView: VIEWS.CREATE_LOAN });
    }

    goToListLoansView = async () => {
        const loans = await getLoans();
        this.setState({ activeView: VIEWS.LIST_LOANS, loans });
    }

    goToHomeView = () => {
        this.setState({ activeView: VIEWS.HOME });
    }

    // interactions with the smart contracts

    createLoanOffer = async (principal, repayment, duration) => {
        const transaction = await this.state.floanContract.requestLoan(principal, repayment, duration);
        console.log(transaction);

        alert('Loan properly created!');
        this.goToHomeView();
    }

    fundLoad = async (loanId) => {
        // TODO: fix `getCredit` call
        // const loadPrincipal = await this.state.floanContract.getCredit(loanId).principal;
        const loadPrincipal = ethers.utils.parseEther('1000');

        const v = await this.state.daiContract.approve(process.env.REACT_APP_FLOAN_ADDRESS, loadPrincipal);
        console.log(v);

        const w = await this.state.floanContract.provideLoan(loanId);
        console.log(w);
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
            activeView = <OpenLoanList
                goToHomeView={this.goToHomeView}
                openLoans={this.state.loans.filter(loan => loan.state === 'OPEN')}
                fundLoad={this.fundLoad}
            />;
        }

        return (
            <div>
                {activeView}
            </div>
        );
    }
}

FLoan.propTypes = {
    provider: PropTypes.object.isRequired,
    signer: PropTypes.object.isRequired,
    signedAddress: PropTypes.string.isRequired,
};
