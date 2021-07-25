import React from 'react';
import { utils } from "ethers";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PaymentIcon from '@material-ui/icons/Payment';

import './Table.css';


export default function RequesterLoanList({ action, goToHomeView, requesterLoans, title }) {

    const rows = requesterLoans.map(loan => {
        return (
            <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>{utils.formatEther(loan.request.principal)}</TableCell>
                <TableCell>{utils.formatEther(loan.request.repayment)}</TableCell>
                <TableCell>{utils.formatEther(loan.request.duration)}</TableCell>
                <TableCell>
                    <PaymentIcon onClick={() => action(loan.id)} />
                </TableCell>
            </TableRow>
        );
    });

    return (
        <>
            <Button variant="outlined" color="primary" onClick={goToHomeView}>Home</Button>
            <h1>{title}</h1>
            <div className="Table__container">
                <TableContainer>
                    <Table className="TablePage__table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Principal</TableCell>
                                <TableCell>Repayment</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Pay</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
