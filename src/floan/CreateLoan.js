import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './CreateLoan.css';


export default class CreateLoan extends React.PureComponent {

    state = {
        principal: '',
        repayment: '',
        duration: '',
        ttl: '',
    };

    prepCreateLoanOffer = () => {
        const principal = parseInt(this.state.principal, 10);
        const repayment = parseInt(this.state.repayment, 10);
        const duration = parseInt(this.state.duration, 10) * 24 * 60 * 60;
        const ttl = parseInt(this.state.ttl, 10) * 24 * 60 * 60;

        this.props.createLoanOffer(principal, repayment, duration, ttl);
    }

    render() {
        return (
            <div className="CreateLoan__container">
                <div>
                    <h2 className="CreateLoan__title">Create loan offer</h2>
                    <div className="CreateLoan__input">
                        <TextField
                            value={this.state.principal}
                            onChange={(e) => this.setState({ principal: e.target.value })}
                            label="Principal"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="CreateLoan__input">
                        <TextField
                            value={this.state.repayment}
                            onChange={(e) => this.setState({ repayment: e.target.value })}
                            label="Repayment (prin + interest)"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="CreateLoan__input">
                        <TextField
                            value={this.state.duration}
                            onChange={(e) => this.setState({ duration: e.target.value })}
                            label="Duration (days)"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="CreateLoan__input">
                        <TextField
                            value={this.state.ttl}
                            onChange={(e) => this.setState({ ttl: e.target.value })}
                            label="Loan offer TTL (days)"
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="CreateLoan__button">
                        <Button variant="outlined" color="primary" onClick={this.prepCreateLoanOffer}>Create</Button>
                    </div>
                </div>
            </div>
        );
    }
}

CreateLoan.propTypes = {
    goToHomeView: PropTypes.func.isRequired,
    createLoanOffer: PropTypes.func.isRequired,
};
