import {ethers} from 'ethers';

// This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider';

// // using MetaMask directly
// const provider = await detectEthereumProvider();

// if (provider) {
//   // From now on, this should always be true:
//   // provider === window.ethereum
//   startApp(provider); // initialize your app
// } else {
//   console.log('Please install MetaMask!');
// }

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(id, contract, arbiter, beneficiary, value) {
  const ApproveButtonId = `approve-${id}`;
  const CancelButtonId = `cancel-${id}`;

  const container = document.getElementById("container");
  // add to the existing contract section
  container.innerHTML += createHTML(ApproveButtonId, CancelButtonId, contract.address, arbiter, beneficiary, value);

  // this waits for the event.
  contract.on('Approved', () => {
    document.getElementById(ApproveButtonId).className = "complete";
    document.getElementById(ApproveButtonId).innerText = "✓ It's been approved!";
    document.getElementById(CancelButtonId).className = "complete";
    document.getElementById(CancelButtonId).innerText = "";
  });

  contract.on('Cancelled', () => {
    document.getElementById(CancelButtonId).className = "cancelled";
    document.getElementById(CancelButtonId).innerText = "It's been cancelled!";
    document.getElementById(ApproveButtonId).className = "complete";
    document.getElementById(ApproveButtonId).innerText = "";
  });

  document.getElementById(ApproveButtonId).addEventListener("click", async () => {
    // catch reverts so we can show the user the error
    let ex;
    try {
      const signer = provider.getSigner();
      
      await contract.connect(signer).approve();
    }
    catch (_ex) {
        ex = _ex;
    }
    alert(`${ex}. Check you are the arbiter and try again.`);
  });

  document.getElementById(CancelButtonId).addEventListener("click", async () => {
    let ex;
    try {
      const signer = provider.getSigner();
      
      await contract.connect(signer).cancel();
    }
    catch (_ex) {
        ex = _ex;
    }
    alert(`${ex}. Check you are the arbiter and try again.`);
  });

}

function createHTML(ApproveButtonId, CancelButtonId, address, arbiter, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Contract: </div>
          <div> ${address} </div>
        </li>  
        <li>
          <div> Arbiter: </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary: </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value (in ETH): </div>
          <div> ${value} </div>
        </li>
        <li>
          <div> To Approve or Cancel you must be the Arbiter!  </div>
        </li>
        <div class="button" id="${ApproveButtonId}">
          Approve
        </div>
        <div class="button" id="${CancelButtonId}">
          Cancel
        </div>
      </ul>
    </div>
  `;
}
