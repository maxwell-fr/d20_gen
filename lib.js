const axios = require('axios');

const WORD_LIST = require('./resources.json').wordList;
const NUMBERS_PER_CODE = 3;
const HASHWORD_LEN = 4;

const getWordCodes = (numbers) => {
  const codes = [];
  for (var i = 0; i < numbers.length; i += NUMBERS_PER_CODE) {
    codes.push(numbers.slice(i, i + NUMBERS_PER_CODE).join('.'));
  }
  return codes;
};

const getRandomNumbers = async (numWords) => {
  const res = await axios.get(
    `https://www.random.org/integers/?num=${
      numWords * NUMBERS_PER_CODE
    }&min=1&max=20&col=1&base=10&format=plain&rnd=new`
  );
  const numbers = res.data.split('\n');
  return numbers.splice(0, numbers.length - 1);
};

module.exports.getPassphrase = async (numWords) => {
  const randomNumbers = await getRandomNumbers(numWords);
  const codes = getWordCodes(randomNumbers);
  return codes.map((c) => WORD_LIST[c]).join(' ');
};

/**
 * Obtain a numeric hash value ranging from 0 to WORD_LIST.length from a given input string.
 * @param {string} word - the word from which the hash value is generated
 */
const getWordHash = (word) => {
  var chars = Array.from(word.toLowerCase());
  var wordValue = chars.reduce((a, c) => a + c.charCodeAt(), 0);
  return wordValue % WORD_LIST.length;
}

/**
 * Return a non-random passphrase derived from the provided inputString. 
 * Each group of HASHWORD_LEN characters (plus any remainder) generate one word in the passphrase.
 * 
 * @param {string} inputString - the string from which the passphrase is derived
 */
module.exports.getPassphraseFromCodewords = (inputString) => {
  const codeStrings = [];

  for(let i = 0; i < inputString.length; i += HASHWORD_LEN) {
    codeStrings.push(inputString.substring(i, i + HASHWORD_LEN));
  }

  return codeStrings.map((c) => WORD_LIST[getWordHash(c)]).join(' ');
}