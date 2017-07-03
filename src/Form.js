import React, { Component } from 'react'
import Wallet from './Wallet.js'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: [],
      error: ''
    }
    this.genWallet = this.genWallet.bind(this);
  }
  genWallet() {
    if (this.address.value === '' || this.public.value === '' || this.private.value === '') {
      this.setState({ error: 'Empty Field!' })
      return
    }
    if (this.state.wallets.find((w) => this.address.value === w.address )) {
      this.setState({ error: 'Duplicate Wallet' })
      return
    }
    let newWallet = {
      address: this.address.value,
      public: this.public.value,
      private: this.private.value
    }
    this.setState({
      wallets: this.state.wallets.concat([newWallet]),
      error: ''
    })
  }
  WalletList(props) {
    const listItems = props.map((p) =>
      <Wallet key={p.address} address={p.address} public={p.public} private={p.private} />
    )
    return (
      <div className="wallets">{listItems}</div>
    )
  }
  errorHTML() {
    return (
      <p><span className="label error">{this.state.error}</span></p>
    )
  }
  render() {
    return (
      <div className="flex column center ">
        <div id="form" className="third middle">
          <input id="addr" className="stack" placeholder="Address" ref={(i) => { this.address = i }} />
          <input id="public" className="stack" placeholder="Public Key" ref={(i) => { this.public = i }} />
          <input id="private" className="stack" placeholder="Private Key" ref={(i) => { this.private = i }} />
          <button id="gen" className="stack icon-paper-plane" onClick={this.genWallet}>Generate</button>
          {this.state.error ? this.errorHTML() : null}
        </div>
        <Wallet address="AbUKT3KXcAMpLD1MsAMRNhgN3hqmzEqqVP" public="0363fccf589ec6c32adf51bf7d38257c199a35fae3a81a97fed4ba0663433e9d10" private="eaca31f751b771ec4ee629e0eca643a27f0c738e5ec8b26bd864a864aaf765a3" />
        {this.WalletList(this.state.wallets)}
      </div>
    )
  }
}

export default Form;
