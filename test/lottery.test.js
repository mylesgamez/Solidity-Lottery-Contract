const Lottery = artifacts.require("Lottery");
const { expectRevert } = require('@openzeppelin/test-helpers');
const { assert } = require("chai");

contract("Lottery", (accounts) => {
    let lottery;
    const manager = accounts[0];
    const player1 = accounts[1];
    const player2 = accounts[2];

    const VRFCoordinatorAddress = "0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4";
    const LinkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

    beforeEach(async () => {
        lottery = await Lottery.new(VRFCoordinatorAddress, LinkTokenAddress);
    });

    it("allows multiple accounts to enter", async () => {
        await lottery.enter({ from: player1, value: web3.utils.toWei("0.02", "ether") });
        await lottery.enter({ from: player2, value: web3.utils.toWei("0.02", "ether") });
        const players = await lottery.getPlayers();
        assert.equal(player1, players[0]);
        assert.equal(player2, players[1]);
        assert.equal(2, players.length);
    });

    it("requires a minimum amount of ether to enter", async () => {
        await expectRevert(
            lottery.enter({ from: player1, value: 0 }),
            "Must send at least 0.01 ETH to enter"
        );
    });

    it("only manager can pick winner", async () => {
        await expectRevert(
            lottery.pickWinner({ from: player1 }),
            "Only the manager can call this function"
        );
    });

    // TODO: Testing Chainlink VRF requires a more complex setup, including funding the contract with LINK tokens and simulating VRF behavior.
    // For the purpose of this example, I am omitting the test for picking a winner using Chainlink VRF.
});
