var css = require('./index.css')

var QRCode = require('qrcode')
var wif = require('wif')

let addrQR = document.getElementById('addrQR')
let pubQR = document.getElementById('pubQR')
let hexQR = document.getElementById('hexQR')
let wifQR = document.getElementById('wifQR')

let makeQR = (cvs, str) => {
  QRCode.toCanvas(cvs, str, { version: 5 }, (err) => {
    if (err) console.log(err)
  })
}

let genQR = function () {
  let addr = document.getElementById('addr').value
  let privateKey = document.getElementById('private').value
  let privateBuffer = new Buffer(privateKey, 'hex')
  let publicKey = document.getElementById('public').value
  let wifKey = wif.encode(128, privateBuffer, true)
  makeQR(addrQR, addr)
  makeQR(pubQR, publicKey)
  makeQR(hexQR, privateKey)
  makeQR(wifQR, wifKey)
}

window.onload = function () {
  document.getElementById('gen').onclick = genQR
}
