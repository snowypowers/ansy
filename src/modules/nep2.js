import { SHA256, AES, enc } from 'crypto-js'
import C from 'crypto-js'
import scrypt from 'scrypt'
import { crypto, toArrayBuffer, toHexString } from "./crypto"
import bs58check from 'bs58check'

const hexXor = (str1, str2) => {
  if (str1.length !== str2.length) throw new Error
  if (str1.length % 2 !== 0) throw new Error
  const result = []
  for (let i = 0; i < str1.length; i += 2) {
    const num1 = parseInt(str1.substr(i, 2), 16)
    const num2 = parseInt(str2.substr(i, 2), 16)
    result.push(num1 ^ num2)
  }
  return toHexString(result)
}

const NEP_HEADER = "0142"
const NEP_FLAG = "e0"

const nep2 = {
  encrypt: (privateKey, keyphrase) => {
    const address = crypto.getAddrFromPri(privateKey)
    // SHA Salt (use the first 4 bytes)
    const addressHash = SHA256(SHA256(enc.Latin1.parse(address))).toString().slice(0, 8)
    //console.log(addressHash)
    // Perform Unicode Normalization
    // TODO
    // Scrypt
    const derived = scrypt.hashSync(Buffer.from(keyphrase, 'utf8'), { "N": 16384, "r": 8, "p": 8 }, 64, Buffer.from(addressHash, 'hex')).toString('hex')
    const derived1 = derived.slice(0, 64)
    const derived2 = derived.slice(64)
    //AES Encrypt
    const xor = hexXor(privateKey, derived1)
    const encrypted = AES.encrypt(enc.Hex.parse(xor), enc.Hex.parse(derived2), { mode: C.mode.ECB, padding: C.pad.NoPadding })
    //Construct
    const assembled = NEP_HEADER + NEP_FLAG + addressHash + encrypted.ciphertext.toString()
    return bs58check.encode(toArrayBuffer(assembled))
  },

  decrypt: (encryptedKey, keyphrase) => {
    const assembled = toHexString(bs58check.decode(encryptedKey))
    const addressHash = assembled.substr(6, 8)
    const encrypted = assembled.substr(-64)
    const derived = scrypt.hashSync(Buffer.from(keyphrase, 'utf8'), { "N": 16384, "r": 8, "p": 8 }, 64, Buffer.from(addressHash, 'hex')).toString('hex')
    const derived1 = derived.slice(0, 64)
    const derived2 = derived.slice(64)
    const ciphertext = { ciphertext: enc.Hex.parse(encrypted), salt: "" }
    const decrypted = AES.decrypt(ciphertext, enc.Hex.parse(derived2), { mode: C.mode.ECB, padding: C.pad.NoPadding })
    const privateKey = hexXor(decrypted.toString(), derived1)
    return privateKey
  }
}

export default nep2
