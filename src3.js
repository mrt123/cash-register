function checkCashRegister(price, cash, cid) {
  const changeTotal = cash - price;
  const changeDrawer = getSortedChangeDrawer(cid, changeTotal);
  const cidTotal = getDrawerSum(cid);
  if (changeDrawer.length === 0 && cidTotal ===0) return 'Closed';
  if (changeDrawer.length === 0 && cidTotal > 0) return 'Insufficient Funds';
  else return changeDrawer;
}

const getSortedChangeDrawer = (cid, changeTotal)=> {
  const changeDrawer = [];

  cid.reverse().forEach((cidSlot)=> {
    const slotName = cidSlot[0];
    const slotTotalValue = cidSlot[1];
    const moneyToTakeFromThisSlot = getChangeFromSlot(changeTotal, slotName, slotTotalValue);
    if (moneyToTakeFromThisSlot > 0) {
      changeDrawer.push([slotName, moneyToTakeFromThisSlot]);
      cidSlot[1] = parseFloat((cidSlot- moneyToTakeFromThisSlot).toFixed(2));
    }
  });
  return changeDrawer;
};

function getDrawerSum(drawer) {
  const drawerSumString = drawer.reduce((sum, item)=> {
    return sum + item[1]
  }, 0).toFixed(2);

  return parseFloat(drawerSumString);
}

function getChangeFromSlot(changeSum, slotName, slotTotalValue) {
  const slotNominalValue = getNominalValueBySlotName(slotName);

  const noOfBillsNeeded = getNumberOfNominalsForSum(changeSum, slotNominalValue);
  const noOfBillsAvailable = getNumberOfNominalsForSum(slotTotalValue, slotNominalValue);
  let noOfBillsToTake = Math.min(noOfBillsNeeded, noOfBillsAvailable);
  return noOfBillsToTake * slotNominalValue;
}

function getNumberOfNominalsForSum(sum, nominalValue) {
  return Math.floor(sum / nominalValue); }

function getNominalValueBySlotName(nominalName) {
  return [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.10],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ].filter((value)=> value[0] === nominalName)[0][1];
}

exports.checkCashRegister = checkCashRegister;