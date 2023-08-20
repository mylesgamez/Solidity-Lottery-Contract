// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Lottery is VRFConsumerBase {
    address public manager;
    address[] public players;
    bytes32 internal keyHash;
    uint256 public fee;
    uint256 public randomResult;

    constructor(
        address _vrfCoordinator,
        address _link
    ) VRFConsumerBase(_vrfCoordinator, _link) {
        manager = msg.sender;
        keyHash = 0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function enter() public payable {
        require(msg.value > .01 ether, "Must send at least 0.01 ETH to enter");
        players.push(msg.sender);
    }

    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK tokens");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(
        bytes32 requestId,
        uint256 randomness
    ) internal override {
        randomResult = randomness;
        pickWinner();
    }

    function pickWinner() public restricted {
        uint index = randomResult % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restricted() {
        require(
            msg.sender == manager,
            "Only the manager can call this function"
        );
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
