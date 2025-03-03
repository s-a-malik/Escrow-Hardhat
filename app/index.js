import {ethers} from 'ethers';
import deploy from './deploy';
import addContract from './addContract';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import "./index.scss";

const provider = new ethers.providers.Web3Provider(ethereum);

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const valueEth = document.getElementById("eth").value;
  const valueWei = ethers.utils.parseEther(valueEth);
  const contract = await deploy(arbiter, beneficiary, valueWei); // this is a promise
  // show result in ETH
  addContract(++contracts, contract, arbiter, beneficiary, valueEth);
}

async function existingContract() {
  try {
    // read the address given by the user
    const address = document.getElementById("address").value;
    const contract = new ethers.Contract(address, Escrow.abi, provider);
    // get the contract details from the blockchain (read-only so no need to sign)
    const arbiter = await contract.arbiter();
    const beneficiary = await contract.beneficiary();
    const valueWei = await provider.getBalance(address);
    const value = ethers.utils.formatEther(valueWei);
    if (value <= 0) {
      throw new Error('Contract is empty! Already been approved or cancelled');
    }
    else {
      addContract(++contracts, contract, arbiter, beneficiary, value);
    }
  }
  // if the address isn't a valid contract in this framing, this will throw an error
  catch (error) {
    alert(`${error}. Check the contract address and try again.`);
  }
}

document.getElementById("deploy").addEventListener("click", newContract);

// also add contracts from the blockchain directly
document.getElementById("existing").addEventListener("click", existingContract);
