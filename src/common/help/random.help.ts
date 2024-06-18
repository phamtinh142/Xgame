import * as seedrandom from 'seedrandom';
import { createHash, randomBytes } from 'crypto';
const rng = seedrandom('KKLfJWRoUAAAAANsQga3wTizgUfUe1NrWH4xbxmc1', { entropy: true });

export interface RandomGameDouble {
  roundNumber: number;
  roundNumberWin: number;
  randomLength: number;
  randomString: string;
  hashSalt: string;
  roundHash: string;
}

export function random() {
  return rng();
}

export function createRandomGameDouble(): RandomGameDouble {
  const roundNumber = random();
  const roundNumberWin = Math.floor(roundNumber * 15);
  const randomLength = roundNumberWin + roundNumberWin + 5;
  const randomString = randomBytes(Math.ceil(randomLength / 2))
    .toString('hex')
    .slice(0, randomLength);
  const hashSalt = createHash('sha224')
    .update(randomString + roundNumber.toString() + Date.now().toString())
    .digest('hex');
  const roundHash = createHash('sha224')
    .update(roundNumber.toString() + hashSalt)
    .digest('hex');

  return {
    roundNumber,
    roundNumberWin,
    randomLength,
    hashSalt,
    roundHash,
    randomString,
  };
}
