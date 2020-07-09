const axios = require('axios');

const WORD_LIST = require('./resources.json').wordList;
const NUMBERS_PER_CODE = 3;

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
 * Return a non-random passphrase derived from the provided inputString. 
 * Each group of NUMBERS_PER_CODE characters (plus any remainder) generate one word in the passphrase.
 * 
 * @param {string} inputString - the string from which the passphrase is derived
 */
module.exports.getCodedPassphrase = (inputString) => {
  const codeStrings = [];

  for(let i = 0; i < inputString.length; i += NUMBERS_PER_CODE) {
    let cs = Array.from(inputString.substring(i, i + NUMBERS_PER_CODE));
    let csh = cs[0].charCodeAt() % 20 + 1 + ".";
       csh += (cs.length < 2) ? 1 + "." : cs[1].charCodeAt() % 20 + 1 + ".";
       csh += (cs.length < 3) ? 1 + "." : cs[2].charCodeAt() % 20 + 1;
    codeStrings.push(csh);
  }


  return codeStrings.map((c) => WORD_LIST[c]).join(' ').trim();
}