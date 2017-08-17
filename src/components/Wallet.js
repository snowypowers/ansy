import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QR from './QR.js'
import crypto from '../modules/crypto.js'
import './Wallet.css'

export default class Wallet extends Component {
  constructor(props) {
    super(props)
    const wif = crypto.getWifFromHex(props.private)
    const publicKey = crypto.getPubFromHex(props.private)
    const address = crypto.getAddrFromPri(props.private)
    this.state = {
      address,
      wif,
      private: props.private,
      public: publicKey
    }
  }

  render() {
    let leftAlign = { textAlign: 'left' }
    return (
      <div className="wallet full flex two">
        <article className="card paper">
          <header>
            <div className="flex grow">
              <input className="wallet-input" placeholder={this.state.address} />
            </div>
          </header>
          <div>
            <div className="flex two">
              <QR name="Address" str={this.state.address} />
              <QR name="Public Key" str={this.state.public} />
            </div>
          </div>
        </article>
        <article className="card paper">
          <header>
            <div className="flex grow">
              <input className="wallet-input" defaultValue="Private Keys" style={leftAlign} />
            </div>
          </header>
          <div>
            <div className="flex two">
              <QR name="HEX" str={this.state.private} />
              <QR name="WIF" str={this.state.wif} />
            </div>
          </div>
        </article>
      </div>
    )
  }
}

Wallet.propTypes = {
  address: PropTypes.string.isRequired,
  private: PropTypes.string.isRequired,
}
