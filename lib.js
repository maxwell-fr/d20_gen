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
