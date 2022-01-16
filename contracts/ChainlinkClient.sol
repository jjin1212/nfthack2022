// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    mapping (uint => uint) public idToResult;
    mapping (bytes32 => uint) requestIdToId;
    
    /**
     * Network: Rinkeby
     * Oracle: 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e (Chainlink Devrel   
     * Node)
     * Job ID: 4ce9b71a1ac94abcad1ff9198e760b8c
     * Fee: 0.1 LINK
     */
    constructor() {
        setPublicChainlinkToken();
        oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
        jobId = "4ce9b71a1ac94abcad1ff9198e760b8c";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestData(string memory _url, uint _id) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        // Set the URL to perform the GET request on
        request.add("get", _url);
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        // request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        request.add("path", "result");
        requestId = sendChainlinkRequestTo(oracle, request, fee);
        requestIdToId[requestId] = _id;
        return requestId;
    }
    
    /**
     * Receive the response in the form of bool
     */ 
    function fulfill(bytes32 _requestId, uint _result) public recordChainlinkFulfillment(_requestId)
    {
        idToResult[requestIdToId[_requestId]] = _result;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}