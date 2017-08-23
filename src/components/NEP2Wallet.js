import React from 'react'
import PropTypes from 'prop-types'
import QR from './QR.js'
import Wallet from './Wallet'

export default class NEP2Wallet extends Wallet {
  constructor(props) {
    super(props)
    this.state.nep2 = this.props.data.nep2
  }
  toggle() {
    this.props.toggleCallback(this.state.address, 'Normal')
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
            <div className="flex one">
              <QR name="NEP2" str={this.state.nep2} />
            </div>
            <footer style={noSpace}>
              <div className="flex grow">
                <textarea className="wallet-input" rows={2} defaultValue={this.state.nep2} style={noResize} />
              </div>
            </footer>
          </div>
        </article>
        <div className="wallet-ui no-print" style={uiStyle}>
          <button onClick={this.remove}>X</button>
          {this.props.data.private ? <button onClick={this.toggle}>{'<'}</button> : null}
        </div>
      </div>
    )
  }
}
NEP2Wallet.propTypes = {
  data: PropTypes.object.isRequired,
  removeCallback: PropTypes.func
}
