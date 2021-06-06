const chai = require('chai')
const { ethers } = require('hardhat')

describe('Token contract', () => {
  let token, owner, addr1, addr2;
  console.log(ethers)
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const TokenFactory = await ethers.getContractFactory('Token');
    token = await TokenFactory.deploy();
  });

  describe('Deployment', () => {
    it('should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('should assign the total supply to owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(await token.totalSupply());
    })
  });

  describe('Transactions', () => {
    it('should transfer tokens between accounts', async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it('should fail if sender doesnt have enough tokens', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      expect(await token.connect(addr1).transfer(owner.address, 1))
        .to
        .be
        .revertedWith('Not enough tokens');
    });
  });
});