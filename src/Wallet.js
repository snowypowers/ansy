import React, { Component } from 'react'
import QR from './QR.js'
import crypto from './crypto.js'
import './Wallet.css'

class Wallet extends Component {
  constructor(props) {
    super(props)
    let wif = crypto.getWifFromHex(props.private)
    let publicKey = crypto.getPubFromHex(props.private)
    console.log(crypto.getAddrFromPri(props.private))
    this.state = { wif, public: publicKey }
  }

  render() {
    let leftAlign = { textAlign: 'left' }
    return (
      <div className="wallet full flex two">
        <article className="card paper">
          <header>
            <div className="flex grow">
              <input className="wallet-input" placeholder={this.props.address} />
            </div>
          </header>
          <div>
            <div className="flex two">
              <QR name="Address" str={this.props.address} />
              <QR name="Public Key" str={this.state.public} />
            </div>
          </div>
        </article>
        <article className="card paper">
          <header>
            <div className="flex grow">
              <input className="wallet-input" defaultValue="Private Keys" style={leftAlign} />
              <input className="wallet-input" placeholder="" />
            </div>
          </header>
          <div>
            <div className="flex two">
              <QR name="HEX" str={this.props.private} />
              <QR name="WIF" str={this.state.wif} />
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default Wallet;
