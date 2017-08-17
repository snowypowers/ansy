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
    this.remove = this.remove.bind(this)
  }

  remove() {
    this.props.removeCallback(this.state.address)
  }

  render() {
    let leftAlign = { textAlign: 'left' }
    const uiStyle = { flexGrow: 0, flexBasis: 0, width: 0 }
    const cardStyle = { flexGrow: 1, margin: 0 }
    const noSpace = { padding: 0, paddingLeft: "0.6rem" }
    const noResize = { resize: "none" }
    return (
      <div className="wallet full flex three">
        <article className="card paper" style={cardStyle}>
          <header style={noSpace}>
            <div className="flex grow">
              <input className="wallet-input" placeholder="Address / Public Key" />
            </div>
          </header>
          <div>
            <div className="flex two">
              <QR name="Address" str={this.state.address} />
              <QR name="Public Key" str={this.state.public} />
            </div>
            <footer style={noSpace}>
              <div className="flex grow">
                <textarea className="wallet-input" rows={2} style={noResize} placeholder={this.state.address} />
              </div>
            </footer>
          </div>
        </article>
        <article className="card paper" style={cardStyle}>
          <header style={noSpace}>
            <div className="flex grow">
              <input className="wallet-input" defaultValue="Private Keys" style={leftAlign} />
            </div>
          </header>
          <div>
            <div className="flex two">
              <QR name="HEX" str={this.state.private} />
              <QR name="WIF" str={this.state.wif} />
            </div>
            <footer style={noSpace}>
              <div className="flex grow">
                <textarea className="wallet-input" rows={2} defaultValue={this.state.wif} style={leftAlign,noResize} />
              </div>
            </footer>
          </div>
        </article>
        <div className="wallet-ui no-print" style={uiStyle}>
          <button onClick={this.remove}>X</button>
        </div>
      </div>
    )
  }
}

Wallet.propTypes = {
  address: PropTypes.string.isRequired,
  private: PropTypes.string.isRequired,
  removeCallback: PropTypes.func
}
