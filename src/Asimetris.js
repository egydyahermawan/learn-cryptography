/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
//@ts-nocheck

const isPrime = num => {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

const generatePrimeNumber = bitLength => {
    const min = 2 ** (bitLength - 1)
    const max = 2 ** bitLength - 1

    while (true) {
        let qCandidate = Math.floor(Math.random() * (max - min + 1)) + min

        if (isPrime(qCandidate)) {
            return qCandidate
        }
    }
}

const generateP = q => {
    let pCandidate = 2 * q + 1

    while (!isPrime(pCandidate)) {
        pCandidate += 2 * q
    }

    return pCandidate
}

const calculateG = (p, q) => {
    for (let h = 2; h < p - 1; h++) {
        let gCandidate = (BigInt(h) ** BigInt((p - 1) / q)) % BigInt(p)

        if (gCandidate > 1n) {
            return {h: h, g: gCandidate}
        }
    }

    return "Tidak ada nilai g yang valid ditemukan"
}

const generateX = q => {
    return BigInt(Math.floor(Math.random() * (q - 1)) + 1)
}

const generateY = (p, g, x) => {
    let y = BigInt(g) ** BigInt(x) % BigInt(p)
    return y
}

const generateK = q => {
    return BigInt(Math.floor(Math.random() * (q - 1)) + 1)
}

const calculateInvers = (num, q) => {
    let t = BigInt(0), newT = BigInt(1)
    let r = BigInt(q), newR = BigInt(num)

    while (newR !== BigInt(0)) {
        let quotient = r / newR;
        [t, newT] = [newT, t - quotient * newT];
        [r, newR] = [newR, r - quotient * newR];
    }

    if (r > BigInt(1)) {
        throw new Error('Tidak ada invers modular')
    }

    if (t < BigInt(0)) {
        t += BigInt(q)
    }

    return t
}

const calculateR = (p, q, g, k) => {
    return (BigInt(g) ** BigInt(k) % BigInt(p)) % BigInt(q)
}

const calculateS = (q, x, kInvers, hashed, r) => {
    return BigInt(kInvers) * (BigInt(`0x${hashed}`) + (BigInt(x) * BigInt(r))) % BigInt(q)
}

const verifySignature = (p, q, g, y, u1, u2, r) => {
    let v = (((BigInt(g) ** u1) * (BigInt(y) ** u2)) % BigInt(p)) % BigInt(q)
    let verified = v === BigInt(r)

    return {v: v, verified: verified}
}

export { isPrime, generateP, generatePrimeNumber, calculateG, generateX, generateY, generateK, calculateInvers, calculateR, calculateS, verifySignature }