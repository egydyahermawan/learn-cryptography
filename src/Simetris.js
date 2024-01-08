/* eslint-disable no-unused-vars */
//@ts-nocheck

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function toDecimal(arr) {
    return arr.map((val, i) => {
        if(val == ' '){
            return val
        }else{
            return alphabet.toUpperCase().indexOf(val)
        }
    })
}

function generateKey(keyword, plaintext) {
    let counter = 0
    let temp = []

    for(let i = 0; i < plaintext.length; i++){
        if(plaintext[i] === ' '){
            temp.push(' ')
        }else{
            if(counter >= keyword.length) counter = 0
            temp.push(keyword[counter])
            counter += 1
        }
    }

    return temp
}

function encription(plaintext, key, algorithm){
    return algorithm == 'caesar' ? plaintext.map((elm) => {
        return elm === ' ' ? ' ' : alphabet.toUpperCase()[(elm + key) % 26]
    }) : plaintext.map((elm, index) => {
        return elm === ' ' ? ' ' : alphabet.toUpperCase()[(elm + key[index]) % 26]
    })
}

function decription(ciphertext, key, algorithm){
    return algorithm == 'caesar' ? ciphertext.map((elm) => {
        if((elm - key) < 0){
            return elm === ' ' ? ' ' : alphabet.toUpperCase()[26 - Math.abs(elm - key)]
        } else{
            return elm === ' ' ? ' ' : alphabet.toUpperCase()[(elm - key) % 26]
        }
    }) : ciphertext.map((elm, index) => {
        if((elm - key[index]) < 0){
            return elm === ' ' ? ' ' : alphabet.toUpperCase()[26 - Math.abs(elm - key[index])]
        }else{
            return elm === ' ' ? ' ' : alphabet.toUpperCase()[(elm - key[index]) % 26]
        }
    })
}

export { toDecimal, generateKey, encription, decription }