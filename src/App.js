import React, { Component } from 'react'
import Form from './components/Form'
import Footer from './components/Footer'
import Wallet from './components/Wallet'
import NEP2Wallet from './components/NEP2Wallet'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: []
    }
    this.print = this.print.bind(this)
    this.addWallet = this.addWallet.bind(this)
    this.removeWallet = this.removeWallet.bind(this)
  }

  addWallet(newWallet) {
    for (const wallet of this.state.wallets) {
      if (wallet.address === newWallet.address) {
        return false
      }
    }
    this.setState({ wallets: this.state.wallets.concat([newWallet]) })
    return true
  }

  removeWallet(addr) {
    this.setState({ wallets: this.state.wallets.filter((w) => w.address !== addr) })
  }

  print() {
    if (this.state.wallets.length > 0) {
      window.print()
    } else {
      alert("You do not have any wallets to print!")
    }
  }

  WalletList(props) {
    const listItems = props.map((p) => {
      if (p.nep2) {
        return (
          <NEP2Wallet key={p.address} address={p.address} private={p.private} nep2={p.nep2} removeCallback={this.removeWallet} />
        )
      } else {
        return (
          <Wallet key={p.address} address={p.address} private={p.private} removeCallback={this.removeWallet} />
        )
      }
    })
    const pages = []
    while (listItems.length) {
      pages.push(this.WalletPage(listItems.splice(0, 4)))
    }
    return (
      <div className="wallets">{pages}</div>
    )
  }

  WalletPage(wallets) {
    return (
      <div className="wallet-page" key={wallets[0].key}>{wallets}</div>
    )
  }
  render() {
    return (
      <div>
        <div className="App">
          <div id="splash" className="App-header">
            <h1>Ansy</h1>
            <p> Paper Wallet for NEO</p>
          </div>
          <div id="content">
            <Form addWallet={this.addWallet} ref={(i) => this.form = i} />
            {this.WalletList(this.state.wallets)}
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
