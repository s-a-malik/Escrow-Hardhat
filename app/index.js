import {ethers} from 'ethers';
import deploy from './deploy';
import addContract from './addContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const valueEth = document.getElementById("eth").value;
  const valueWei = ethers.utils.parseEther(valueEth);
  const contract = await deploy(arbiter, beneficiary, valueWei);
  // show result in ETH
  addContract(++contracts, contract, arbiter, beneficiary, valueEth);
}

document.getElementById("deploy").addEventListener("click", newContract);
