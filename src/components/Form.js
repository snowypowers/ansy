import React, { Component } from 'react'
import PropTypes from 'prop-types'
import crypto from '../modules/crypto'
import NEP2 from '../modules/nep2'

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: [],
      error: '',
      progress: 0
    }
    this.genWallet = this.genWallet.bind(this)
    this.genKey = this.genKey.bind(this)
  }
  genWallet() {
    if (this.private.value === '') {
      this.setState({ error: 'Empty Field!' })
      return
    }
    if (this.private.value.length !== 64 && this.private.value.length !== 52 && this.private.value.length !== 58) {
      this.setState({ error: 'Wrong Private Key Length!' })
      return
    }

    let privateKey = this.private.value
    let verifyAddr
    let newWallet = {
      address: verifyAddr,
      private: privateKey,
      nep2: ''
    }
    // Decrypt NEP2
    if (this.private.value.length === 58 && this.conPassword.value.length > 0) {
      try {
        newWallet.nep2 = this.private.value
        privateKey = NEP2.decrypt(this.private.value, this.conPassword.value)
        this.conPassword.value = ''
      } catch(e) {
        this.setState({error: 'Invalid Password'})
        return
      }
    }

    // Test Private key and get Address
    try {
      if (this.private.value.length === 52) {
        privateKey = crypto.getHexFromWif(this.private.value)
      }
      verifyAddr = crypto.getAddrFromPri(privateKey)
      if (this.address.value !== '' && this.address.value !== verifyAddr) {
        this.setState({ error: 'Address Verification Failed' })
        return
      }
    } catch (e) {
      this.setState({ error: "Invalid Private key!" })
      return
    }
    newWallet.address = verifyAddr
    newWallet.private = privateKey
    if (this.conPassword.value.length > 0) {
      newWallet.nep2 = NEP2.encrypt(newWallet.private, this.conPassword.value)
    }
    const done = this.props.addWallet(newWallet)
    if (done) {
      this.private.value = ''
      this.address.value = ''
      this.conPassword.value = ''
    } else {
      this.setState({ error: "Duplicate wallet!" })
    }
  }

  genKey() {
    const privateKey = crypto.genPriKey()
    const address = crypto.getAddrFromPri(privateKey)
    let newWallet = { address, private: privateKey, type:'Normal' }
    if (this.genPassword.value.length > 0) {
      newWallet.nep2 = NEP2.encrypt(privateKey, this.genPassword.value)
      newWallet.type='NEP2'
    }
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
      <div className="no-print flex column center">
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
                <input type="text" id="private" className="stack" placeholder="Private Key" ref={(i) => this.private = i} />
                <input type="text" id="addr" className="stack" placeholder="Address (Optional)" ref={(i) => this.address = i} />
                <input type="password" id="con-pwd" className="stack" placeholder="Password (Optional)" ref={(i) => this.conPassword = i} />
                <button id="convert" className="stack center-text" onClick={this.genWallet} >Convert</button>
              </div>
              <div style={tabContainer}>
                <p className="center-text"> Or generate a new Private Key! </p>
                <input type="password" id="gen-pwd" className="stack" placeholder="Password (Optional)" ref={(i) => this.genPassword = i} />
                <button id="gen" className="stack center-text" onClick={this.genKey} >Generate!</button>
                <p> Warning: Encryption will take a while</p>
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
