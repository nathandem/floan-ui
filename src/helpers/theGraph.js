import axios from 'axios';


export const getLoans = async () => {
    // https://docs.ethers.io/v5/single-page/#/v5/getting-started/-%23-getting-started--history

    const query = `{
        loans {
          id
          request {
            requester {
                id
                amountOutstanding
                amountRequested
                amountRepayed
            }
            principal
            repayment
            duration
          }
          state
        }
      }`;
    const loans = await axios.post('https://api.thegraph.com/subgraphs/name/kronael/floan', { query });

    return loans.data.data.loans;
};

export const getRequesterInfo = async (requesterId) => {
    const query = `{requester(id: "${requesterId}") {
        id
        amountOutstanding
        amountRepayed
        amountRequested
      }}`;
    const requesterInfo = await axios.post('https://api.thegraph.com/subgraphs/name/kronael/floan', { query });

    return requesterInfo.data.data.requester;
};
