//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import { ISuperToken, ISuperfluid } from "./RedirectAll.sol";

import "./Club.sol";

contract Factory {
    event ClubCreated(address clubAddress);

    constructor() {
    }

    function createClub(address adminWallet, ISuperfluid host, ISuperToken acceptedToken) public returns (address) {
        Club club = new Club(adminWallet, host, acceptedToken);
        emit ClubCreated(address(club));
        return address(club);
    }
}