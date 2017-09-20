const currencyNominals = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

function checkCashRegister(price, cash, drawerSlots) {
  const requiredChangeSum = cash - price;
  const changeAsSortedDrawer = getReversedChangeDrawer(drawerSlots, requiredChangeSum);

  const totalInDrawer = getDrawerSum(drawerSlots);
  const changeDrawerSum = getDrawerSum(changeAsSortedDrawer);

  if (requiredChangeSum > changeDrawerSum) return 'Insufficient Funds';
  else if (requiredChangeSum === totalInDrawer) return 'Closed';
  else return changeAsSortedDrawer;
}

function getReversedChangeDrawer(drawerSlots, remainingChangeSum) {
  return drawerSlots.reverse().map((slot) => {
    const valueAvailableFromSlot = getValueAvailableFromSlot(remainingChangeSum, slot, currencyNominals);
    remainingChangeSum = parseFloat((remainingChangeSum - valueAvailableFromSlot).toFixed(2));
    return [slot[0], valueAvailableFromSlot];
  }).filter((slot) => slot[1] > 0);
}

function getDrawerSum(drawer) {
  const sumString = drawer.reduce((sum, item)=> {
    return sum + item[1]
  }, 0).toFixed(2);
  return parseFloat(sumString);
}

function getValueAvailableFromSlot(changeSum, slot, currencyNominals) {
  const slotTotalValue = slot[1];
  const slotName = slot[0];
  const nominalValue = currencyNominals[slotName];

  const numberOfNominalsNeeded = Math.floor(changeSum / nominalValue);
  const numberOfNominalsAvailable = Math.floor(slotTotalValue / nominalValue);
  let numberOfNominalsCanTake = numberOfNominalsAvailable < numberOfNominalsNeeded ? numberOfNominalsAvailable : numberOfNominalsNeeded;
  return numberOfNominalsCanTake * nominalValue;
}

exports.checkCashRegister = checkCashRegister;