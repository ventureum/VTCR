pragma solidity 0.4.23;
import "./Disbursement.sol";

contract Filter {

    event SetupAllowance(address indexed beneficiary, uint amount);

    Disbursement public disburser;
    address public owner;
    mapping(address => Beneficiary) public beneficiaries;

    struct Beneficiary {
        uint claimAmount;
        bool claimed;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(
        address[] _beneficiaries,
        uint[] _beneficiaryTokens
    ) public {
        owner = msg.sender;
        for(uint i = 0; i < _beneficiaries.length; i++) {
            beneficiaries[_beneficiaries[i]] = Beneficiary({
                claimAmount: _beneficiaryTokens[i],
                claimed: false
            });
            emit SetupAllowance(_beneficiaries[i],beneficiaries[_beneficiaries[i]].claimAmount);
        }
    }

    function setup(Disbursement _disburser)
        public
        onlyOwner
    {
        require(address(disburser) == 0 && address(_disburser) != 0);
        disburser = _disburser; 
    }

    function claim()
        public
    {
        require(beneficiaries[msg.sender].claimed == false);
        beneficiaries[msg.sender].claimed = true;
        disburser.withdraw(msg.sender, beneficiaries[msg.sender].claimAmount);
    }
}
