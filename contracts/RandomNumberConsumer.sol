// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint32 private constant GENERATION_IN_PROGRESS = 108;
    mapping(uint256 => uint256) idToRandomResult;
    mapping(bytes32 => uint256) requestIdToId;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor()
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088 // LINK Token
        )
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10**18; // 0.1 LINK (Varies by network)
    }

    /**
     * Requests randomness
     */
    function getRandomNumber(uint256 _id) public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        idToRandomResult[_id] = GENERATION_IN_PROGRESS;
        requestIdToId[requestId] = _id;
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        uint256 id = requestIdToId[requestId];
        idToRandomResult[id] = (randomness % 100) + 1;
    }

    function getRandomResultForId(uint256 _id)
        public
        view
        returns (uint256 randomResult)
    {
        require(
            idToRandomResult[_id] != GENERATION_IN_PROGRESS,
            "Still generating please try again later"
        );
        require(idToRandomResult[_id] != 0, "Not generated");
        return idToRandomResult[_id];
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
