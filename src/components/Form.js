import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Wallet from './Wallet'
import crypto from '../modules/crypto'

export default class Form extends Component {
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
    if (this.private.value.length !== 64 && this.private.value.length !== 52) {
      this.setState({ error: 'Wrong Private Key Length!' })
      return
    }

    let privateKey = this.private.value
    if (this.private.value.length === 52) {
      privateKey = crypto.getHexFromWif(this.private.value)
    }
    let verifyAddr = crypto.getAddrFromPri(privateKey)
    if (this.address.value !== '' && this.address.value !== verifyAddr) {
      this.setState({ error: 'Address Verification Failed' })
      return
    }
    let newWallet = {
      address: verifyAddr,
      private: privateKey
    }
    const done = this.props.addWallet(newWallet)
    if (done) {
      this.private.value = ''
      this.address.value = ''
    } else {
      this.setState({ error: "Duplicate wallet!" })
    }
  }

  genKey() {
    let privateKey = crypto.genPriKey()
    let address = crypto.getAddrFromPri(privateKey)
    let newWallet = { address, private: privateKey }
    const done = this.props.addWallet(newWallet)
    if (!done) {
      this.genKey()
    }
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
      <p className="center-text" key="error"><span className="label error">{this.state.error}</span></p>
    )
  }
  render() {
    return (
      <div className="flex column center">
        <div id="form" className="third middle">
          <input id="private" className="stack" placeholder="Private Key" ref={(i) => { this.private = i }} />
          <input id="addr" className="stack" placeholder="Address (Optional)" ref={(i) => { this.address = i }} />
          <button id="convert" className="stack center-text" onClick={this.genWallet} >Convert</button>
          {this.state.error ? this.errorHTML() : null}
          <p className="center-text"> Or generate a new Private Key! </p>
          <button id="gen" className="stack center-text" onClick={this.genKey} >Generate!</button>
        </div>


      </div>
    )
  }
}

Form.propTypes = {
  addWallet: PropTypes.func.isRequired
}
