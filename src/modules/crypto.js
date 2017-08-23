import EC from 'ecurve'
import BigInteger from 'bigi'
import { SHA256, RIPEMD160, enc } from 'crypto-js'
import bs58 from 'bs58'

import hmacDRBG from 'hmac-drbg'
import hash from 'hash.js'

const ec = EC.getCurveByName('secp256r1')
const ADDR_VERS = '17'


export const toHexString = function(arrayBuffer) {
    let s = "";
    for (const i of arrayBuffer) {
        s += (i >>> 4).toString(16);
        s += (i & 0xf).toString(16);
    }
    return s;
}

export const toArrayBuffer = function(s) {
  let result = []
  for (let i=0;i < s.length;i+=2) {
    result.push(parseInt(s.substring(i, i+2), 16))
  }
  return Uint8Array.from(result)
}

export const WIF = {
  encode: (s) => {
    let extended = "80" + s + "01"
    const shaOut = SHA256(SHA256(enc.Hex.parse(extended))).toString()
    extended += shaOut.substring(0,8)
    return bs58.encode(toArrayBuffer(extended))
  },
  decode: (s) => {
    let extended = toHexString(bs58.decode(s))
    return extended.substring(2, 66)
  }
}

export const crypto = {
  getCurvePtFromHex: (privateKey) => {
    const privateKeyBuffer = new BigInteger.fromHex(privateKey)
    const curvePt = ec.G.multiply(privateKeyBuffer)
    return curvePt
  },
  getPubFromHex: (privateKey) => {
    const curvePt = crypto.getCurvePtFromHex(privateKey)
    return curvePt.getEncoded(true).toString('hex')
  },
  getWifFromHex: (privateHex) => {
    return WIF.encode(privateHex)
  },
  getHexFromWif: (privateWIF) => {
    return WIF.decode(privateWIF)
  },
  getAddrFromPri: (privateKey) => {
    // Have no idea why we extend the key but it works...
    let publicKey = '21' + crypto.getPubFromHex(privateKey) + 'ac'
    publicKey = enc.Hex.parse(publicKey)
    let ripHash = RIPEMD160(SHA256(publicKey)).toString()
    // Add ADDR_VERS in front of RIPEMD
    ripHash = ADDR_VERS + ripHash
    // SHA256 2 times
    const shaOutput = SHA256(SHA256(enc.Hex.parse(ripHash))).toString()
    // Address = RIPEMD + SHA[0:4]
    const shaChecksum = toArrayBuffer(shaOutput.substring(0, 8))
    // Construct RIPEMD buffer
    const ripBuffer = toArrayBuffer(ripHash)
    // Construct 25 byte Address Buffer
    let addrBuffer = new Uint8Array(25)
    addrBuffer.set(ripBuffer,0)
    addrBuffer.set(shaChecksum,21)
    return bs58.encode(addrBuffer)
  },
  genPriKey: () => {
    let key = new Uint8Array(32)
    if (window.crypto) {
      window.crypto.getRandomValues(key)
      key = key.reduce((prev, curr) => {
        let hex = ("0" + curr.toString(16)).slice(-2)
        return prev + hex
      }, "")
    } else {
      let enc = ""
      for (let i = 0; i < 32; i++) {
        key[i] = Math.floor(Math.random() * 256)
        enc += key[i].toString(16)
      }
      let d = new hmacDRBG({
        hash: hash.sha256,
        entropy: enc,
        nonce: enc
      })
      key = d.generate(32, 'hex')
    }
    return key.toString('hex')
  }
}

export default crypto
