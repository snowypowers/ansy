import React, { Component } from 'react'
import Form from './Form.js'
import Footer from './Footer.js'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.print = this.print.bind(this)
  }
  print() {
    if (this.form.state.wallets.length > 0) {
      window.print()
    } else {
      alert("You do not have any wallets to print!")
    }
  }
  render() {
    return (
      <div>
        <div className="App">
          <div id="splash" className="App-header">
            <h1>Ansy</h1>
            <p> Convert your keys into a paper wallet </p>
          </div>
          <div id="content">
            <Form ref={(i) => this.form = i} />
          </div>
          <div id="print-foot">
            <div className="third middle">
              <button className="full" type="button" onClick={this.print}> Print!</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
