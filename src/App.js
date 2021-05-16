// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: null,
      number: '',
      tabledata: []
    }
  }

  myChangeHandler = (event) => {
    this.setState({ number: event.target.value });
  }
  readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          this.setState({ content: allText });
          this.printDataInTable(this.state.content);
        }
      }
    };
    rawFile.send(null);
  };
  mySubmitHandler = (event) => {
    event.preventDefault();
    // alert("You are submitting " + this.state.number);
    this.readTextFile('https://raw.githubusercontent.com/invictustech/test/main/README.md');
  }

  printDataInTable(fileContent) {
    let result = this.findMostFrequent(fileContent, this.state.number);
    console.log(result, "Result");
    this.setState({ tabledata: result });

  };

  findMostFrequent = (str = '', num = 1) => {
    const strArr = str.split(' ');
    const map = {};
    strArr.forEach(word => {
      if (map.hasOwnProperty(word)) {
        map[word]++;
      } else {
        map[word] = 1;
      }
    });
    const frequencyArr = Object.keys(map).map(key => {
      return [{ occurance: map[key], wordname: key }];
    });
    frequencyArr.sort((a, b) => {
      return b[0].occurance - a[0].occurance;
    });
    return frequencyArr.slice(0, num).map(el => el[0]);
  };

  render() {
    const div_table = {
      "textAlign":"center",
      "marginLeft":'25%',
      "width":"100%"
    }
    const centre_table = {
      "width":"50%",
      "textAlign":"center",
      "marginTop":'50px',
      "borderStyle":"groove",
      "borderCollapse": "collapse"
      
    };
    const td_table = {
      "borderCollapse": "collapse",
      "border": "5px solid black",
      "color":"#FCDCA9",
      "padding":"10px"
      
    }
    const th_table = {
      "color":"#E57F84",
      "fontSize":"20px",
      "textDecorationLine":'underline',
      "borderCollapse": "collapse",
      "border": "5px solid black ",
      "borderRadius":"800px",
      "padding":"15px"
      
    }
    return (
      <div className="App">
        {/* <header className="App-header">
        
        </header> */}
        <h1 id="my-header" style={{"textDecorationLine":'underline',"color":"whitesmoke"}}>Top {this.state.number} frequent words</h1>
        <form onSubmit={this.mySubmitHandler}>
          <input style={{"height":"40px","width":"200px","borderRadius":"8px","fontSize":"20px","backgroundColor":"white","color":"black"}}
            type='number' placeholder="Enter number"
            onChange={this.myChangeHandler}
          />
          <div>
          <input style={{"height":"60px","borderRadius":"6px","backgroundColor":"green","color":"whitesmoke","marginTop":"20px","fontSize":"20px","textAlign":"center"}}
            type='submit' value='GET THE ANSWER'
          />
          </div>
        </form>
        <div style={div_table}>
          <table style={centre_table}>
            <thead style={centre_table}>
              <tr>
                <th style={th_table}>Word Occurance</th>
                <th style={th_table}>Word Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tabledata && this.state.tabledata.map(word => {
                return <tr style={centre_table}>
                  <td style={td_table}>{word.occurance}</td>
                  <td style={td_table}>{word.wordname}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

      </div>
    );
  };
}

export default App;
