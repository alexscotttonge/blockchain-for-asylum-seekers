pragma solidity ^0.4.4;

contract Identity {
  
    address private owner;
    mapping(bytes32 => string) public attributes;

  function Identity(address _owner, string _name, string _dob) public {
    owner = _owner;
    attributes["name"] = _name;
    attributes["dob"] = _dob;
  }

}
