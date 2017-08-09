const assert = require('assert');
const expect = require('chai').expect;
const checkCashRegister = require('./src2').checkCashRegister;

describe('cash-reg our tests', function () {

  describe('when cid is less then change', ()=> {
    const cid = [
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
    const price = 0.01;
    const cash = 0.05;

    it('should return Insufficient Funds', () => {
        assert.equal(checkCashRegister.call(this, price, cash, cid), 'Insufficient Funds');
      }
    );
  });

  describe('when cid equals to change due', ()=> {
    const price = 0.01;
    const cash = 0.05;
    const cid = [
      ["PENNY", 0.04],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0]
    ];

    it('should return Closed', () => {
        assert.equal(checkCashRegister.call(this, price, cash, cid), 'Closed');
      }
    );
  });

  describe('when change can be given', ()=> {
    const price = 0.01;
    const cash = 100;
    const drawerWithOneHundred = [
      ["PENNY", 0.05],
      ["NICKEL", 0],
      ["DIME", 0.20],
      ["QUARTER", 0.75],
      ["ONE", 4],
      ["FIVE", 5],
      ["TEN", 10],
      ["TWENTY", 80],
      ["ONE HUNDRED", 0]
    ];
    const expectedChange = [
      ["TWENTY", 80],
      ["TEN", 10],
      ["FIVE", 5],
      ["ONE", 4],
      ["QUARTER", 0.75],
      ["DIME", 0.2],
      ["PENNY", 0.04]
    ];

    it('should return 99.99 change in order from highest to lowest', () => {
        const change = checkCashRegister(price, cash, drawerWithOneHundred);
        expect(change).to.eql(expectedChange);
      }
    );
  });
});

describe('cash-reg tests from assignment', function () {

  it('should return [["QUARTER", 0.50]]', () => {
      expect(checkCashRegister(19.50, 20.00, [
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

  it('should return [.. 96.74 ...]', () => {

      expect(checkCashRegister(3.26, 100.00, [
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

  it('should return "Insufficient Funds"', () => {
      expect(checkCashRegister(19.50, 20.00, [
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

  it('should return "Insufficient Funds"', () => {
      expect(checkCashRegister(19.50, 20.00, [
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
      expect(checkCashRegister(19.50, 20.00, [
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





