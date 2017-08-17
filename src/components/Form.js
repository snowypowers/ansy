import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    let verifyAddr
    try {

      if (this.private.value.length === 52) {
        privateKey = crypto.getHexFromWif(this.private.value)
      }
      let verifyAddr = crypto.getAddrFromPri(privateKey)
      if (this.address.value !== '' && this.address.value !== verifyAddr) {
        this.setState({ error: 'Address Verification Failed' })
        return
      }
    } catch (e) {
      this.setState({ error: "Invalid Private key!" })
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

  errorHTML() {
    return (
      <p className="center-text" key="error"><span className="label error">{this.state.error}</span></p>
    )
  }
  render() {
    const formContainer = {
      padding: 0,
      margin: "0 auto"
    }
    const tabContainer = {
      padding: 20
    }
    return (
      <div className="flex column center">
        <div className="two-third middle" style={formContainer}>
          <div className="tabs two">
            <input id="tab-1" type="radio" name="formtabs" defaultChecked={true} />
            <input id="tab-2" type="radio" name="formtabs" />
            <div className="flex half middle">
              <label className="pseudo button toggle" htmlFor="tab-1"> Convert </label>
              <label className="pseudo button toggle" htmlFor="tab-2"> Generate </label>
            </div>
            <div className="row">
              <div style={tabContainer}>
                <input id="private" className="stack" placeholder="Private Key" ref={(i) => this.private = i} />
                <input id="addr" className="stack" placeholder="Address (Optional)" ref={(i) => this.address = i} />
                <button id="convert" className="stack center-text" onClick={this.genWallet} >Convert</button>
              </div>
              <div style={tabContainer}>
                <p className="center-text"> Or generate a new Private Key! </p>
                <input id="vanity" className="stack" placeholder="Starts with..." ref={(i) => this.vanity = i} />
                <button id="gen" className="stack center-text" onClick={this.genKey} >Generate!</button>
              </div>
            </div>
          </div>
          {this.state.error ? this.errorHTML() : null}
        </div>


      </div>
    )
  }
}

Form.propTypes = {
  addWallet: PropTypes.func.isRequired
}
