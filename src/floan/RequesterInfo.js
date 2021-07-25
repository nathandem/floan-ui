import React from "react";
import { utils } from "ethers";

import Button from "@material-ui/core/Button";

import "./RequesterInfo.css";

export default function RequesterInfo({ goToHomeView, requesterInfo }) {
  const etherToFixed = (number) => {
    const formatted = utils.formatEther(number);
    return parseFloat(formatted.toString()).toFixed(2);
  };
  return (
    <div className="Centered__container">
      <div>
        <Button variant="outlined" color="primary" onClick={goToHomeView}>
          Home
        </Button>

        <div>Requester address: {requesterInfo.id}</div>
        <div>Amount outstanding: {etherToFixed(requesterInfo.amountOutstanding)}</div>
        <div>Amount repayed: {etherToFixed(requesterInfo.amountRepayed)}</div>
        <div>Amount requested: {etherToFixed(requesterInfo.amountRequested)}</div>
        <div>Amount overdue: {etherToFixed(requesterInfo.amountOverdue)}</div>
        <div>
          <a
            href={`https://app-kovan.poh.dev/profile/${requesterInfo.id}`}
            target="_blank"
          >
            Proof of humanity
          </a>
        </div>
      </div>
    </div>
  );
}
