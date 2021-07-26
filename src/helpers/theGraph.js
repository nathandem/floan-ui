import axios from 'axios';


export const getLoans = async () => {
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
          provision {
                id
                timestamp
          }
          state
        }
      }`;
    const data = await axios.post('https://api.thegraph.com/subgraphs/name/kronael/floan', { query });

    const loans = data.data.data.loans;

    for(const loan of loans){
        if(loan.provision){
            loan.expires = loan.provision.timestamp + Number(loan.request.duration);
            loan.is_expired = (loan.expires < Date.now() / 1000) && (loan.state === 'PROVIDED' || loan.state !== 'DRAWN')
        }else{
            loan.expires = null
            loan.is_expired = false
        }
    }

    return loans;
};

export const getRequesterInfo = async (requesterId) => {
    const query = `{requester(id: "${requesterId}") {
        id
        amountOutstanding
        amountRepayed
        amountRequested
      }}`;
    const data = await axios.post('https://api.thegraph.com/subgraphs/name/kronael/floan', { query });

    const info = data.data.data.requester;
    info.amountOverdue = 0;

    const loans = await getLoans();

    for (const loan of loans)
        if (loan.request.requester.id === requesterId)
            if (loan.is_expired)
                info.amountOverdue += loan.request.repayment;

    return info;
};
