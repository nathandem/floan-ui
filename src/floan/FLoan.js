import PropTypes from 'prop-types';
import React from 'react';
import { ethers } from "ethers";

import floanAbi from '../abis/floan.json';
import erc20Abi from '../abis/erc20.json';

import CreateLoan from './CreateLoan';
import Home from './Home';
import OpenLoanList from './OpenLoanList';
import RequesterInfo from './RequesterInfo';
import RequesterLoanList from './RequesterLoanList';

import { getLoans, getRequesterInfo } from '../helpers/theGraph';


const VIEWS = {
    HOME: 'home',
    CREATE_LOAN: 'create_loan',
    LIST_LOANS: 'list_loans',
    REQUESTER_INFO: 'requester_info',
    REQUESTER_PROVIDED_LOANS_VIEW: 'requester_provided_loans_view',
    REQUESTER_DRAWN_LOANS_VIEW: 'requester_drawn_loans_view',
};

export default class FLoan extends React.PureComponent {

    state = {
        floanContract: null,  // ethers.js Contract entity for floan
        daiContract: null,  // ethers.js Contract entity for dai
        activeView: VIEWS.HOME,
        loans: [],
        requesterInfo: null,
    };

    componentDidMount = async () => {
        const floanContract = new ethers.Contract(process.env.REACT_APP_FLOAN_ADDRESS, floanAbi, this.props.signer);

        // Get DAI ERC20 address
        const daiAddress = await floanContract.getTokenAddress();
        const daiContract = new ethers.Contract(daiAddress, erc20Abi, this.props.signer);

        floanContract.on('LogRequestLoan', (requester, loanID, principal, repayment, duration, event) => {
            console.log(`LogRequestLoan event`);
            console.log(event);
        });

        this.setState({ daiContract, floanContract });
    }

    componentWillUnmount() {
        // remove all listeners added on floanContract in `componentDidMount`
        this.state.floanContract.removeAllListeners();
    }

    // change view

    goToCreateLoanView = () => {
        this.setState({ activeView: VIEWS.CREATE_LOAN });
    }

    goToListLoansView = async () => {
        const loans = await getLoans();
        console.log(loans);
        this.setState({ activeView: VIEWS.LIST_LOANS, loans });
    }

    goToRequesterInfoView = async (requesterId) => {
        const requesterInfo = await getRequesterInfo(requesterId);
        console.log(requesterInfo);
        this.setState({ activeView: VIEWS.REQUESTER_INFO, requesterInfo });
    }

    goToRequesterProvidedLoansView = async () => {
        const loans = await getLoans();
        console.log(loans);
        this.setState({ activeView: VIEWS.REQUESTER_PROVIDED_LOANS_VIEW, loans });
    }

    goToRequesterDrawnLoansView = async () => {
        const loans = await getLoans();
        console.log(loans);
        this.setState({ activeView: VIEWS.REQUESTER_DRAWN_LOANS_VIEW, loans });
    }

    goToHomeView = () => {
        this.setState({ activeView: VIEWS.HOME });
    }

    // interactions with the smart contracts

    createLoanOffer = async (principal, repayment, duration) => {
        const transaction = await this.state.floanContract.requestLoan(principal, repayment, duration);
        console.log(transaction);

        // IF WE WANT TO WAIT THAT THE TRANSACTION GETS IN A BLOCK (CAN BE LONG)
        // const receipt = await transaction.wait();
        // console.log(receipt);

        alert('Loan properly created!');
        this.goToHomeView();
    }

    fundLoan = async (loanId) => {
        // TODO: fix `getCredit` call
        // const loadPrincipal = await this.state.floanContract.getCredit(loanId).principal;
        const loadPrincipal = ethers.utils.parseEther('1000');

        const v = await this.state.daiContract.approve(process.env.REACT_APP_FLOAN_ADDRESS, loadPrincipal);
        console.log(v);

        const w = await this.state.floanContract.provideLoan(loanId);
        console.log(w);

        alert(`You successfully funded loan: ${loanId}`);
        this.goToHomeView();
    }

    drawLoan = async (loanId) => {
        console.log(await this.state.floanContract.drawLoan(loanId));

        alert(`You received the funds from the load: ${loanId}`);
        this.goToHomeView();
    }

    paybackLoan = async (loanId) => {
        console.log(await this.state.floanContract.paybackLoan(loanId));

        alert(`You successfully payed back loan: ${loanId}`);
        this.goToHomeView();
    }

    render() {
        let activeView;
        if (this.state.activeView === VIEWS.HOME) {
            activeView = <Home
                goToCreateLoanView={this.goToCreateLoanView}
                goToListLoansView={this.goToListLoansView}
                goToRequesterProvidedLoansView={this.goToRequesterProvidedLoansView}
                goToRequesterDrawnLoansView={this.goToRequesterDrawnLoansView}
                signerAddress={this.props.signerAddress}
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
                fundLoan={this.fundLoan}
                goToRequesterInfoView={this.goToRequesterInfoView}
            />;
        } else if (this.state.activeView === VIEWS.REQUESTER_INFO) {
            activeView = <RequesterInfo
                goToHomeView={this.goToHomeView}
                requesterInfo={this.state.requesterInfo}
            />;
        } else if (this.state.activeView === VIEWS.REQUESTER_PROVIDED_LOANS_VIEW) {
            const loans = this.state.loans.filter(loan => (
                loan.request.requester.id.toLowerCase() === this.props.signerAddress.toLowerCase()
                && loan.state === 'PROVIDED'
            ));

            activeView = <RequesterLoanList
                title={'Provided loans (funded loans, not withdrawn)'}
                goToHomeView={this.goToHomeView}
                requesterLoans={loans}
                action={this.drawLoan}
            />;
        } else if (this.state.activeView === VIEWS.REQUESTER_DRAWN_LOANS_VIEW) {
            const loans = this.state.loans.filter(loan => (
                loan.request.requester.id.toLowerCase() === this.props.signerAddress.toLowerCase()
                && loan.state === 'DRAWN'
            ));

            activeView = <RequesterLoanList
                title={'Reimburse loans'}
                goToHomeView={this.goToHomeView}
                requesterLoans={loans}
                action={this.paybackLoan}
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
    signerAddress: PropTypes.string.isRequired,
};
