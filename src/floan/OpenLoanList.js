import React from "react";
import { utils } from "ethers";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import PaymentIcon from "@material-ui/icons/Payment";

import "./Table.css";

export default function OpenLoanList({
    goToHomeView,
    goToRequesterInfoView,
    fundLoad,
    openLoans,
}) {
    const rows = openLoans.map((loan) => {
        const etherToFixed = (number) => {
            const formatted = utils.formatEther(number);
            return parseFloat(formatted.toString()).toFixed(2);
        };
        const formatDays = (seconds) => {
            const days = parseInt(seconds, 10) / 60 / 60 / 24;
            return Number(days)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        return (
            <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>
                    <a onClick={() => goToRequesterInfoView(loan.request.requester.id)}>
                        {loan.request.requester.id}
                    </a>
                </TableCell>
                <TableCell>{etherToFixed(loan.request.principal)}</TableCell>
                <TableCell>{etherToFixed(loan.request.repayment)}</TableCell>
                <TableCell>{formatDays(loan.request.duration)}</TableCell>
                <TableCell>
                    <PaymentIcon onClick={() => fundLoad(loan.id)} />
                </TableCell>
            </TableRow>
        );
    });

    // parseFloat(etherBalance); return floatBalance.toFixed(8)
    return (
        <>
            <Button variant="outlined" color="primary" onClick={goToHomeView}>
                Home
            </Button>
            <div className="Table__container">
                <TableContainer>
                    <Table className="TablePage__table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Requester</TableCell>
                                <TableCell>Principal</TableCell>
                                <TableCell>Repayment</TableCell>
                                <TableCell>Duration (in days)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{rows}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
