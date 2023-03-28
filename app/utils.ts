import crypto from 'crypto'

function generateToken(length: number): string {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length) // trim to specified length
}

export {generateToken}