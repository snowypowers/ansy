import React, { Component } from 'react'
import WIF from 'wif'
import EC from 'ecurve'
import BigInteger from 'bigi'
import QR from './QR.js'
import './Wallet.css'

const getPublicKey = (privateKey) => {
  let ec = EC.getCurveByName('secp256r1')
  let privateKeyBuffer = new Buffer(privateKey, 'hex')
  let curvePt = ec.G.multiply(BigInteger.fromBuffer(privateKeyBuffer))
  console.log(curvePt.getEncoded(true).toString('hex'))
  return curvePt.getEncoded(true).toString('hex')
}

class Wallet extends Component {
  constructor(props) {
    super(props)
    let wif = WIF.encode(128, new Buffer(props.private, 'hex'), true)
    let publicKey = getPublicKey(props.private)
    this.state = { wif, public: publicKey }
  }

  componentDidMount() {
    this.wif = WIF.encode(128, new Buffer(this.props.private, 'hex'), true)
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
