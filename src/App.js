import React from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import {address} from './contract.js';
import {abi} from './contract.js';





class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      myaddress: '',
      curent_value: '',
      new_value: '',
      myContract:'',
    };  
  }
  
  componentWillMount(){
     this.loadblockchian()

  }
 
   async loadblockchian(){
    window.ethereum.enable()
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    const myContract = new web3.eth.Contract(abi,address);

  
    const myaddress = await web3.eth.getAccounts(function(error, accounts) { });
    this.setState({myaddress: myaddress[0]});
    this.setState({myContract: myContract});
    
    
  
   
  }

  async loadValue(){
     const curent_value = await this.state.myContract.methods.retreive().call({from: this.state.myaddress})
       .then(function(result){
       // console.log(result);
       return result;
    });
    this.setState({curent_value: curent_value});  
    
     
  }

  async addNewValue () {

   // console.log(this.state.new_value);
    const new_value = await this.state.myContract.methods.store(this.state.new_value).send({from: this.state.myaddress})
       .then(function(result){
        return result;
     });
    this.setState({curent_value: this.state.new_value});  
  }

  updateInputValue(evt){
   // console.log(evt.target.value);
    this.setState({new_value: evt.target.value});  
    
     
  }

  render() {
   return (
    <div className="App">
      <header className="App-header">
       <h2>Ethereum number storing App </h2>
       <p>The current value is {this.state.curent_value}</p>
       <input type="button" value="Show Existing Data" onClick={() => this.loadValue()}/>
       <input type="text" name="new_value" onChange={(e) => {this.updateInputValue(e)}}/>
       <input type="button" value="Add to blockchian" onClick={() => this.addNewValue()}/>
       
      </header>
    </div>
    );
  }
}

export default App;
