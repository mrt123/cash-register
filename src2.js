function checkCashRegister(price, cash, cid) {
  const requiredChangeSum = cash - price;

  const changeAsSortedDrawer = getChangeAsSortedDrawerSlots(requiredChangeSum, cid);
  const cidSum = getDrawerSum(cid);
  const changeDrawerSum = getDrawerSum(changeAsSortedDrawer);

  if (requiredChangeSum > changeDrawerSum) return 'Insufficient Funds';
  else if (requiredChangeSum === cidSum) return 'Closed';
  else return changeAsSortedDrawer;
}

function getDrawerSum(drawer) {
  const drawerSumString = drawer.reduce((sum, item)=> {
    return sum + item[1]
  }, 0).toFixed(2);

  return parseFloat(drawerSumString);
}

function getChangeAsSortedDrawerSlots(changeSum, cid) {

  cid.reverse().forEach((cidSlot)=> {
    const moneyToTakeFromThisSlot = getValueAvailableFromSlot(changeSum, cidSlot);
    cidSlot[2] = moneyToTakeFromThisSlot;
    changeSum = parseFloat((changeSum - moneyToTakeFromThisSlot).toFixed(2));
  });

  return cid.map((i)=>[i[0], i[2]]).filter((i)=>i[1] !== 0);
}

function getNominalValueBySlotName(nominalName) {
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
  return nominalValues.filter((value)=> value[0] === nominalName)[0][1];
}

function getValueAvailableFromSlot(changeSum, cidSlot) {
  const slotTotalValue = cidSlot[1];
  const slotName = cidSlot[0];
  const slotNominalValue = getNominalValueBySlotName(slotName);

  const numberOfNominalsNeeded = Math.floor(changeSum / slotNominalValue);
  const numberOfNominalsAvailable = Math.floor(slotTotalValue / slotNominalValue);
  let numberOfNominalsCanTake = numberOfNominalsAvailable < numberOfNominalsNeeded ? numberOfNominalsAvailable : numberOfNominalsNeeded;
  return numberOfNominalsCanTake * slotNominalValue;
}

exports.checkCashRegister = checkCashRegister;