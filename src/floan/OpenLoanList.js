import React from 'react';
import { utils } from "ethers";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import PaymentIcon from '@material-ui/icons/Payment';

import './Table.css';


export default function OpenLoanList({ goToHomeView, fundLoad, openLoans }) {

    const rows = openLoans.map(loan => {
        return (
            <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>{loan.request.requester.id}</TableCell>
                <TableCell>{utils.formatEther(loan.request.principal)}</TableCell>
                <TableCell>{utils.formatEther(loan.request.repayment)}</TableCell>
                <TableCell>{utils.formatEther(loan.request.duration)}</TableCell>
                <TableCell>
                    <PaymentIcon onClick={() => fundLoad(loan.id)} />
                </TableCell>
                {/* <TableCell>
                    <img onClick={() => this.props.onTriggerCreateEditBountiFlow(bounti.id)} src={process.env.PUBLIC_URL + '/assets/icon/edit.svg'}/>
                </TableCell> */}
            </TableRow>
        );
    });

    return (
        <>
            <Button variant="outlined" color="primary" onClick={goToHomeView}>Home</Button>
            <div className="Table__container">
                <TableContainer>
                    <Table className="TablePage__table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Requester</TableCell>
                                <TableCell>Principal</TableCell>
                                <TableCell>Repayment</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell></TableCell>
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
