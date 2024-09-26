// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";
contract Club is RedirectAll {

  constructor (
    address adminWallet,
    ISuperfluid host,
    ISuperToken acceptedToken
  )
    RedirectAll (
      host,
      acceptedToken,
      adminWallet
     )
      {}
}
