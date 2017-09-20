const expect = require('chai').expect;
const checkCashRegister = require('./src3').checkCashRegister;

describe('cash-reg tests from assignment', function () {

  it('should return [["QUARTER", 0.50]]', () => {
      expect(checkCashRegister(price = 19.50, cash = 20.00, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.10],
        ["QUARTER", 4.25],
        ["ONE", 90.00],
        ["FIVE", 55.00],
        ["TEN", 20.00],
        ["TWENTY", 60.00],
        ["ONE HUNDRED", 100.00]
      ])).to.eql([["QUARTER", 0.50]]);
    }
  );

  it('should return total of 96.74', () => {

      expect(checkCashRegister(price = 3.26, cash = 100.00, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.10],
        ["QUARTER", 4.25],
        ["ONE", 90.00],
        ["FIVE", 55.00],
        ["TEN", 20.00],
        ["TWENTY", 60.00],
        ["ONE HUNDRED", 100.00]
      ])).to.eql([
        ["TWENTY", 60.00],
        ["TEN", 20.00],
        ["FIVE", 15.00],
        ["ONE", 1.00],
        ["QUARTER", 0.50],
        ["DIME", 0.20],
        ["PENNY", 0.04]
      ]);
    }
  );

  it('should return "Insufficient Funds" case 1', () => {
      expect(checkCashRegister(price = 19.50, cash = 20.00, [
        ["PENNY", 0.01],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
      ])).to.eql('Insufficient Funds');
    }
  );

  it('should return "Insufficient Funds" case 2', () => {
      expect(checkCashRegister(price = 19.50, cash = 20.00, [
        ["PENNY", 0.01],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 1.00],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
      ])).to.eql('Insufficient Funds');
    }
  );

  it('should return "Closed', () => {
      expect(checkCashRegister(price = 19.50, cash = 20.00, [
        ["PENNY", 0.50],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
      ])).to.eql('Closed');
    }
  );
});
