import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'

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
  genWallet () {
    if (this.private.value === '') {
      this.setState({ error: 'Empty Field!' })
      return
    }
    if (!wallet.isNEP2(this.private.value) && !wallet.isWIF(this.private.value) && !wallet.isPrivateKey(this.private.value)) {
      this.setState({ error: 'Wrong Private Key Length!' })
      return
    }

    let newWallet = {}
    try {
      const acct = new wallet.Account(this.private.value)
      if (wallet.isNEP2(this.private.value)) {
        if (this.conPassword.value.length > 0) {
          newWallet.nep2 = acct.encrypted
          acct.decrypt(this.conPassword.value)
        } else {
          this.setState({error: "Encrypted key provided without password!"})
        }
      }
      newWallet.private = acct.privateKey
      newWallet.public = acct.publicKey
      newWallet.address = acct.address
    } catch (e) {
      this.setState({ error: "Invalid Private key!" })
      return
    }

    const done = this.props.addWallet(newWallet)
    if (done) {
      this.private.value = ''
      this.address.value = ''
      this.conPassword.value = ''
      this.setState({ error: '' })
    } else {
      this.setState({ error: "Duplicate wallet!" })
    }
  }

  genKey () {
    const acct = new wallet.Account()
    let newWallet = {
      address: acct.address,
      private: acct.privateKey,
       type: 'Normal'
      }
    if (this.genPassword.value.length > 0) {
      newWallet.nep2 = wallet.encrypt(newWallet.private, this.genPassword.value)
      newWallet.type = 'NEP2'
    }
    const done = this.props.addWallet(newWallet)
    if (!done) {
      this.genKey()
    }
  }

  errorHTML () {
    return (
      <p className="center-text" key="error"><span className="label error">{this.state.error}</span></p>
    )
  }

  render () {
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
