import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';

import './Home.css';


export default function Home({ signedAddress, goToCreateLoanView, goToListLoansView }) {
    return (
        <div className="Home__container">
            <div>
                <div><h3>You are logged-in as {signedAddress}</h3></div>

                <div className="Home__button"><Button variant="outlined" onClick={goToCreateLoanView}>Create loan request</Button></div>
                <div className="Home__button"><Button variant="outlined" onClick={goToListLoansView}>View open loans</Button></div>
            </div>
        </div>
    );
}

Home.propTypes = {
    goToCreateLoanView: PropTypes.func.isRequired,
    goToListLoansView: PropTypes.func.isRequired,
    signedAddress: PropTypes.string.isRequired,
};
