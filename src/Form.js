import React, { Component } from 'react'
import Wallet from './Wallet.js'
import crypto from './crypto.js'
const centerText = { textAlign: 'center' }

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: [],
      error: ''
    }
    this.genWallet = this.genWallet.bind(this)
    this.genKey = this.genKey.bind(this)
  }
  genWallet() {
    if (this.private.value === '') {
      this.setState({ error: 'Empty Field!' })
      return
    }
    if (this.private.value.length != 64) {
      this.setState({ error: 'Wrong Private Key Length!' })
    }
    if (this.state.wallets.find((w) => this.private.value === w.private)) {
      this.setState({ error: 'Duplicate Wallet' })
      return
    }
    let verifyAddr = crypto.getAddrFromPri(this.private.value)
    if (this.address.value != '' && this.address.value != verifyAddr) {
      this.setState({ error: 'Address Verification Failed' })
      return
    }
    let newWallet = {
      address: this.address.value,
      private: this.private.value
    }
    this.setState({
      wallets: this.state.wallets.concat([newWallet]),
      error: ''
    })

    this.address.value = ''
    this.private.value = ''
  }

  genKey() {
    let privateKey = crypto.genPriKey()
    let address = crypto.getAddrFromPri(privateKey)
    let newWallet = { address, private: privateKey }
    this.setState({
      wallets: this.state.wallets.concat([newWallet]),
      error: ''
    })
  }

  WalletList(props) {
    const listItems = props.map((p) =>
      <Wallet key={p.address} address={p.address} private={p.private} />
    )
    return (
      <div className="wallets">{listItems}</div>
    )
  }
  errorHTML() {
    return (
      <p style={centerText} key="error"><span className="label error">{this.state.error}</span></p>
    )
  }
  render() {
    return (
      <div className="flex column center">
        <div id="form" className="third middle">
          <input id="private" className="stack" placeholder="Private Key" ref={(i) => { this.private = i }} />
          <input id="addr" className="stack" placeholder="Address (Optional)" ref={(i) => { this.address = i }} />
          <button id="convert" className="stack" onClick={this.genWallet} style={centerText}>Convert</button>
          {this.state.error ? this.errorHTML() : null}
          <p style={centerText}> Or generate a new Private Key! </p>
          <button id="gen" className="stack" onClick={this.genKey} style={centerText}>Generate!</button>
        </div>
        {this.WalletList(this.state.wallets)}

      </div>
    )
  }
}
export default Form;
