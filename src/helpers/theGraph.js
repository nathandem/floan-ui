import axios from 'axios';


export const getLoans = async () => {
    // https://docs.ethers.io/v5/single-page/#/v5/getting-started/-%23-getting-started--history

    const query = `{
        loans {
          id
          request {
            requester
            principal
            repayment
            duration
            validUntil
          }
          state
        }
      }`;
    const loans = await axios.post('https://api.thegraph.com/subgraphs/name/kronael/floan', { query });

    return loans.data.data.loans;
};
