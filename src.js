const PENNY = 0.01;
const NICKEL = 0.05;
const DIME = 0.1;
const QUARTER = 0.25;
const ONE = 1;
const FIVE = 5;
const TEN = 10;
const TWENTY = 20;
const ONE_HUNDRED = 100;

const nominalValues = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.10],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];




function checkCashRegister(price, cash, cid) {

  let changeSum = getChangeSum(price, cash);
  let drawerSum = getDrawerSum(cid);

  if (changeSum > drawerSum) return 'Insufficient Funds';
  else if (changeSum === drawerSum) return 'Closed';
  else return getSortedChange(price, cash, cid);
}

function getDrawerSum(drawer) {
  const drawerSumString = drawer.reduce((sum, item)=> {
    return sum + item[1]
  }, 0).toFixed(2);

  return parseFloat(drawerSumString);
}

function getSortedChange(price, cash, cid) {
  let changeSumRemaining = getChangeSum(price, cash);

  //let allNominals = getAllNominals();

  let changeToGive = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];

  cid.reverse().forEach((cidDrawerSlot)=> {
    let howManyToTake = decideHowManyNominalsToTake(cidDrawerSlot, changeSumRemaining);
    changeToGive = mergeNNominalsIntoChange(changeToGive, cidDrawerSlot, howManyToTake);
  });

  return changeToGive;
}

function mergeNNominalsIntoChange(existingChange, nominal, n) {
  if (n === 0 ) return existingChange;

  else {
    // we have to merge nominal if exists and update value
    // get empty array / in drawer structure (with 0 amounts)
    const updatedChange = existingChange.map((drawerSlot)=> {
      const drawerSlotName = drawerSlot[0];
      const nominalName = nominal[0];
      if(drawerSlotName === nominalName) {
        return [drawerSlotName, depositIntoSlotNNominals(drawerSlot, nominal)]
      }
      else return drawerSlot;
    });

    function depositIntoSlotNNominals(slot1, slot2, n) {
      const stringDrawerSum = (slot1[1] + slot2[1]).toFixed()
      return parseFloat(stringDrawerSum);
    }

    return updatedChange;
  }
}

function decideHowManyNominalsToTake(nominal, changeSumRemaining) {

  const nominalCombinedValue = nominal[1];

  if (nominalCombinedValue === 0) return 0;
  else {
    const howManyOfNominalIHave = nominalCombinedValue / getNominalValue(nominal);
    const howManyNotesOfThisNominalNeeded = getNumberOfNominalsToCoverSum(nominal, changeSumRemaining);
    if(howManyNotesOfThisNominalNeeded <= howManyOfNominalIHave) return  howManyNotesOfThisNominalNeeded;
    else return howManyOfNominalIHave;
  }
}

function getNumberOfNominalsToCoverSum(nominal, sum) {
  const nominalValue = getNominalValue(nominal);
  return Math.floor(sum / nominalValue);
}


function getNominalValue(nominal) {
  let matchingNominalValue = nominalValues.filter((valueItem)=> {
    return nominal[0] === valueItem[0];
  } )[0];
  return matchingNominalValue[1];
}

function getChangeSum(price, cash) {
  return cash - price;
}

function getAllNominals() {
  return [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
}

function getLargestChangeNominal(allNominals, changeSum) {
  return getNominalsLowerThenChangeSum(allNominals, changeSum).sort(compareNumbers);
}

function getNumberOfNeededNominals() {

}

function getNominalsLowerThenChangeSum(allNominals, changeSum) {
  return allNominals.filter((nominal)=>nominal < changeSum);
}

function compareNumbers(a, b) {
  return a - b;
}

exports.checkCashRegister = checkCashRegister;