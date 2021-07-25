import React from 'react';

import './Landing.css';


export default function Landing({ connectWallet }) {
    return (
        <div className="Landing__container">
            <div>
                <section>
                    <h1>fLoan: uncolleteralized loans made real</h1>
                </section>
                <div className="Landing__connectButton">
                    <div><button onClick={connectWallet}>Connect wallet</button></div>
                </div>
            </div>
        </div>
    );
}
