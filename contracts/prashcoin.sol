pragma solidity >=0.4.21 <0.7.0;

contract prashCoin{
    struct User{
        address account_address;
        string name;
        uint pin;
        uint amount;
    }
    mapping(address=>User) private users;
    function create_account(string memory _name,uint _pin) public{
        users[msg.sender] = User(msg.sender,_name,_pin,10);
    }
    modifier isUser(uint _pin){
        require(_pin == users[msg.sender].pin && msg.sender == users[msg.sender].account_address);
        _;
    }
    modifier verifyBalance(uint _amt){
        require(users[msg.sender].amount>=_amt);
        _;
    }
    function check_balance(uint _pin) public isUser(_pin) view returns(uint){
        return users[msg.sender].amount;
    }
    function transfer_coin(address _receiver,uint _amt,uint _pin) isUser(_pin) verifyBalance(_amt) public{
        users[msg.sender].amount = users[msg.sender].amount - _amt;
        users[_receiver].amount = users[_receiver].amount + _amt;
    }
}