// tamper_config reads the encrypted config file and flips some of the bits to make it decrypt to
// a new value.
// Importantly, it does not know the secret key or the entire plaintext. All it knows is the
// contents of the four bytes that it wants to modify, and their offset in the file. This is not
// unrealistic for an attacker to know, since config formats tend to be relatively static.

const fs = require('fs')
const { Buffer } = require('buffer')

const PATH = 'config.json'

function xor_buffers(a, b) {
    const result = Buffer.alloc(a.length)
    for (let i = 0; i < a.length; i++) {
        result[i] = a[i] ^ b[i]
    }
    return result
}

const encryptedConfig = fs.readFileSync(PATH)

const iv = encryptedConfig.slice(0, 16)
const ciphertext = encryptedConfig.slice(17)

// Compute the bit flips required to go from "fals" to " tru"
const flips = xor_buffers(Buffer.from('fals'), Buffer.from(' tru'))

// Apply those bit flips to the block _before_ the block we want to modify
const flippedBytes = xor_buffers(flips, ciphertext.slice(44, 48))
flippedBytes.copy(ciphertext, 44)

// Write back the tampered config
const data = Buffer.concat([iv, Buffer.from(':'), ciphertext])
fs.writeFileSync(PATH, data)