App = {
  web3Provider: null,
  contracts: {},
  account:'0x0',

  init: function() {
    var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.hide();
    transfer.hide();
    create.hide();
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3!=='undefined'){
      App.web3Provider=web3.currentProvider;
      web3=new Web3(web3.currentProvider);
    }
    else{
      App.web3Provider=new Web3.providers.HttpProvider('http://localhost:7545');
      web3=new web3(web3.App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("prashCoin.json", function(prashcoin) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.prashCoin = TruffleContract(prashcoin);
      // Connect provider to interact with contract
      App.contracts.prashCoin.setProvider(App.web3Provider);

    return App.render();
    });
  },
render : function(){
  web3.eth.getCoinBase(function (err, account){
    if(err == null){
      console.log(account);
      console.log(web3.eth.account);
    }
  });
},
createaccount:function(){
  App.contracts.prashCoin.deployed().then((i)=>{
    coin_instance=i;
    var cust_name=document.getElementById('cust_name').value;
    var cust_pin=document.getElementById('cust_pin').value;
    return coin_instance.create_account(cust_name,cust_pin)
  }).then((r)=>{
    if(r.receipt.status=='0x1')
    alert("Account Created Successfully");
    else
    alert("Sorry there was an error...")
  })
  var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.hide();
    transfer.hide();
    create.hide();

},

checkbalance:function(){
  App.contracts.prashCoin.deployed().then((i)=>{
    coin_instance=i;
    var cust_pin=document.getElementById('bal_pin').value;
    return coin_instance.check_balance(cust_pin)
  }).then((r)=>{
    alert("Your Balance is:"+r.toNumber());
  })
  var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.hide();
    transfer.hide();
    create.hide();
},

transferCoin:function(){
  var coin_instance;
  App.contracts.prashCoin.deployed().then((i)=>{
    coin_instance=i;
    var receiver_address=document.getElementById('receiver_address').value;
    var amount=document.getElementById('amount').value;
    var pin=document.getElementById('pin').value;
    return coin_instance.transfer_coin(receiver_address,amount,pin);
  }).then((r)=>{
    if(r.receipt.status=='0x1')
    alert("Transfer Success!");
    else
    alert("Sorry there was an error...")
  })
  var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.hide();
    transfer.hide();
    create.hide();
},

togglebal : function(){
  var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.show();
    transfer.hide();
    create.hide();
},
toggleAccount : function(){
  var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.hide();
    transfer.hide();
    create.show();
},
toggletransfer : function(){
  var bal = $("#balance");
    var create = $("#account");
    var transfer=$("#transfer");

    bal.hide();
    transfer.show();
    create.hide();
}
  

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
