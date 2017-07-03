import React, { Component } from 'react'
import QRCode from 'qrcode'

const makeQR = (cvs, str) => {
  QRCode.toCanvas(cvs, str, { version: 5 }, (err) => {
    if (err) console.log(err)
  })
}

class QR extends Component {
  componentDidMount() {
    makeQR(this.cvs, this.props.str)
  }
  render() {
    return (
      <div className="qr-block">
        <canvas className="qr" ref={(i) => this.cvs = i}></canvas>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

export default QR
