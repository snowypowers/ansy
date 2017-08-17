import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode'
import './QR.css'

const makeQR = (cvs, str) => {
  QRCode.toCanvas(cvs, str, { version: 5, margin: 1 }, (err) => {
    if (err) alert(err)
  })
}

export default class QR extends Component {
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
    const noPad = { padding: 0 }
    return (
      <div className="qr-block" style={noPad}>
        <div className="qr" onDoubleClick={this.toggleQR}>
          <canvas className={this.state.showQR ? 'showQR' : 'hideQR'} ref={(i) => this.cvs = i} ></canvas>
          <span className={(this.state.showQR ? 'hideQR' : 'showQR') + ' hexstr'} > {this.props.str}</span>
        </div>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

QR.propTypes = {
  name: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  correctLevel: PropTypes.string
}
