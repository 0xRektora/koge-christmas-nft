// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract KogeXMassNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIds;

    string public baseUri;

    IERC20 constant kogecoin = IERC20(0x13748d548D95D78a3c83fe3F32604B4796CFfa23);
    IERC20 constant vKogeKoge = IERC20(0x992Ae1912CE6b608E0c0d2BF66259ab1aE62A657);

    constructor(string memory __baseUri) ERC721('KogeXMass', 'KGXM') {
        baseUri = __baseUri;
    }

    function mint() external returns (uint256) {
        require(kogecoin.balanceOf(msg.sender) > (10**9) * 50 || vKogeKoge.balanceOf(msg.sender) > (10**9) * 20);
        tokenIds.increment();
        uint256 newItemId = tokenIds.current();
        _safeMint(msg.sender, newItemId);

        return newItemId;
    }
}
