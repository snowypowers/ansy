import React, { Component } from 'react'
import QRCode from 'qrcode'
import './QR.css'

const makeQR = (cvs, str) => {
  QRCode.toCanvas(cvs, str, { version: 5 }, (err) => {
    if (err) console.log(err)
  })
}

class QR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showQR: true
    }
    this.toggleQR = this.toggleQR.bind(this)
  }

  toggleQR() {
    if (this.state.showQR) {
      this.setState({ showQR: false })
    } else {
      this.setState({ showQR: true })
    }
  }

  componentDidMount() {
    makeQR(this.cvs, this.props.str)
  }

  render() {
    return (
      <div className="qr-block">
        <div className="qr" onDoubleClick={this.toggleQR}>
          <canvas className={this.state.showQR ? 'showQR' : 'hideQR'} ref={(i) => this.cvs = i} ></canvas>
          <span className={(this.state.showQR ? 'hideQR' : 'showQR') + ' hexstr'} > {this.props.str}</span>
        </div>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

export default QR
