import React, { Component } from 'react'
import WIF from 'wif'
import QR from './QR.js'
import './Wallet.css'

class Wallet extends Component {
  constructor(props) {
    super(props)
    let wif =WIF.encode(128, new Buffer(props.private, 'hex'), true)
    this.state = {wif}
  }

  componentDidMount() {
    this.wif = WIF.encode(128, new Buffer(this.props.private, 'hex'), true)
  }

  render() {
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
              <QR name="Public Key" str={this.props.public} />
            </div>
          </div>
        </article>
        <article className="card paper">
          <header>
            <div className="flex grow">
              <span>Private Keys</span>
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
