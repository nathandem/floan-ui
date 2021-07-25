import React from 'react';

import Button from '@material-ui/core/Button';

import './RequesterInfo.css';


export default function RequesterInfo({ goToHomeView, requesterInfo }) {
    return (
        <div className="Centered__container">
            <div>
                <Button variant="outlined" color="primary" onClick={goToHomeView}>Home</Button>

                <div>Requester address: {requesterInfo.id}</div>
                <div>Amount outstanding: {requesterInfo.amountOutstanding}</div>
                <div>Amount repayed: {requesterInfo.amountRepayed}</div>
                <div>Amount requested: {requesterInfo.amountRequested}</div>
                <div><a href={`https://app-kovan.poh.dev/profile/${requesterInfo.id}`} target="_blank">Proof of humanity</a></div>
            </div>
        </div>
    );
}
