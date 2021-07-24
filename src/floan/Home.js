import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';

import './Home.css';


export default function Home({ signedAddress, goToCreateLoanView, goToListLoansView }) {
    return (
        <div className="Home__container">
            <h3>You are logged-in as {signedAddress}</h3>

            <Button variant="outlined" onClick={goToCreateLoanView}>Create loan request</Button>
            <Button variant="outlined" onClick={goToListLoansView}>Create loan request</Button>
        </div>
    );
}

Home.propTypes = {
    goToCreateLoanView: PropTypes.func.isRequired,
    goToListLoansView: PropTypes.func.isRequired,
    signedAddress: PropTypes.string.isRequired,
};
