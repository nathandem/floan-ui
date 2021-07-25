import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';

import './Home.css';


export default function Home({ signerAddress, goToCreateLoanView, goToListLoansView, goToRequesterOpenLoansView }) {
    return (
        <div className="Home__container">
            <div>
                <div><h3>You are logged-in as {signerAddress}</h3></div>

                <div className="Home__button"><Button variant="outlined" onClick={goToCreateLoanView}>Create loan request</Button></div>
                <div className="Home__button"><Button variant="outlined" onClick={goToListLoansView}>View open loans</Button></div>
                <div className="Home__button"><Button variant="outlined" onClick={goToRequesterOpenLoansView}>Pay your loans</Button></div>
            </div>
        </div>
    );
}

Home.propTypes = {
    goToCreateLoanView: PropTypes.func.isRequired,
    goToListLoansView: PropTypes.func.isRequired,
    signerAddress: PropTypes.string.isRequired,
};
