const BankExample = artifacts.require("./../contracts/BankExample.sol");

module.exports = function (deployer) {
  deployer.deploy(BankExample, { value: 2000000 });
};