// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TokenContract is ERC20, Ownable {
    using SafeMath for uint256;
    uint public constant MAX_SUPPLY = 1000000000000000;
    uint public remaining_supply;

    constructor() ERC20("token", "ABC") {
        remaining_supply = MAX_SUPPLY;
    }

    function mint(uint _amount) public payable {
        require(_amount > 0, "negative amount");
        require(_amount < remaining_supply, "no supply left");
        _mint(msg.sender, _amount);
        remaining_supply -= _amount;
    }

    function mintWithAddress(address _address, uint _amount) public payable {
        require(_amount > 0, "negative amount");
        require(_amount < remaining_supply, "no supply left");
        _mint(_address, _amount);
        remaining_supply -= _amount;  
    }

    function burn(uint _amount) public onlyOwner {
        require(_amount > 0, "negative amount");
        require (remaining_supply + _amount <= MAX_SUPPLY, "max_supply overflow");
        remaining_supply += _amount;
    }
}
