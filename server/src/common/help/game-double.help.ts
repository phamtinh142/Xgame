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

export function createNewRotateGameDouble(roundNumberWin: number, randomRotate: number): number {
  switch (roundNumberWin) {
    case 0:
      return randomRotate + 24 * 4;
    case 1:
      return randomRotate + 24 * 5;
    case 2:
      return randomRotate + 24 * 7;
    case 3:
      return randomRotate + 24 * 9;
    case 4:
      return randomRotate + 24 * 11;
    case 5:
      return randomRotate + 24 * 13;
    case 6:
      return randomRotate;
    case 7:
      return randomRotate + 24 * 2;
    case 8:
      return randomRotate + 24 * 6;
    case 9:
      return randomRotate + 24 * 8;
    case 10:
      return randomRotate + 24 * 10;
    case 11:
      return randomRotate + 24 * 12;
    case 12:
      return randomRotate + 24 * 14;
    case 13:
      return randomRotate + 24;
    case 14:
      return randomRotate + 24 * 3;
  }
}
