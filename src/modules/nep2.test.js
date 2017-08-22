import nep2 from './nep2'
import { toArrayBuffer } from './crypto'
import bs58check from 'bs58check'
const keys = [
  {
    passphrase: "TestingOneTwoThree",
    encrypted: "6PYVPVe1fQznphjbUxXP9KZJqPMVnVwCx5s5pr5axRJ8uHkMtZg97eT5kL",
    wif: "L44B5gGEpqEDRS9vVPz7QT35jcBG2r3CZwSwQ4fCewXAhAhqGVpP",
    hex: "CBF4B9F70470856BB4F40F80B87EDB90865997FFEE6DF315AB166D713AF433A5"
  },
  {
    passphrase: "Satoshi",
    encrypted: "6PYN6mjwYfjPUuYT3Exajvx25UddFVLpCw4bMsmtLdnKwZ9t1Mi3CfKe8S",
    wif: "KwYgW8gcxj1JWJXhPSu4Fqwzfhp5Yfi42mdYmMa4XqK7NJxXUSK7",
    hex: "09C2686880095B1A4C249EE3AC4EEA8A014F11E6F986D0B5025AC1F39AFBD9AE"
  }
]

it("Test", () => {
  const min = bs58check.encode(toArrayBuffer("0142e0000000000000000000000000000000000000000000000000000000000000000000000000"))
  expect(min).toBe("6PYJxKpVnkXUsnZAfD2B5ZsZafJYNp4ezQQeCjs39494qUUXLnXijLx6LG")
  const max = bs58check.encode(toArrayBuffer("0142e0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"))
  expect(max).toBe("6PYXg5tGnLYdXDRZiAqXbeYxwDoTBNthbi3d61mqBxPpwZQezJTvQHsCnk")
})
it("Encrypt", () => {
  keys.map((item) => {
    let encrypted = nep2.encrypt(item.hex, item.passphrase)
    expect(encrypted).toBe(item.encrypted)
  })
})
it("Decrypt", () => {
  keys.map((item) => {
    let decrypted = nep2.decrypt(item.encrypted, item.passphrase)
    expect(decrypted.toUpperCase()).toBe(item.hex.toUpperCase())
  })
})
