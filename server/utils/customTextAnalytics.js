import $ from 'jquery';
import { wordsAPIKey } from '../../API_KEYS';
/**
 * Helper functions for custom text analytics
 */

// get each word's word count
export function countEachWord(textInput) {
  // split up input string into arrays by spaces and newline chars
  const whiteSpaceChars = /\s/;
  const allWords = textInput.split(whiteSpaceChars);
  const wordCountObject = {};

  allWords.forEach((currentWord) => {
    // get rid of punctuation and make word lowercase
    const editedWord = currentWord.replace(/\W/g, '').toLowerCase();
    // account for empty strings (aka trailed whitespace)
    if (editedWord.length) {
      if (!wordCountObject[editedWord]) {
        wordCountObject[editedWord] = 1;
      } else {
        wordCountObject[editedWord] += 1;
      }
    }
  });

  return wordCountObject;
}

// find the top three most-used words, excluding 'the', 'a', 'an', and 'and'
function topThreeWords(wordCountObject) {
  const wordsToIgnore = /the\b|a\b|an\b|and\b|is\b|that\b|to\b|i\b/;

  // avoid modifying original wordCountObject
  const copiedObj = JSON.parse(JSON.stringify(wordCountObject));
  const mostCommonWords = {};

  const wordKeys = Object.keys(copiedObj);
  let i = 0;

  wordKeys.forEach((word) => {
    if (word.match(wordsToIgnore)) {
      delete copiedObj[word];
    }
  });

  function findCurrentMostFrequent(wordObj) {
    let largest = 0;
    let mostUsed = '';
    const currentKeys = Object.keys(wordObj);
    currentKeys.forEach((key) => {
      if (wordObj[key] > largest) {
        largest = wordObj[key];
        mostUsed = key;
      }
    });
    mostCommonWords[mostUsed] = largest;
    delete copiedObj[mostUsed];
  }

  while (i < 3) {
    if (Object.keys(copiedObj).length) {
      findCurrentMostFrequent(copiedObj);
    }
    i++;
  }

  return mostCommonWords;
}

// checks to see if any 'avoid' words (words the user wants to avoid) were used
function checkWordsToAvoid(wordsToAvoidArr, allWordsUsedObj) {
  const wordsUsed = {};
  wordsToAvoidArr.forEach((word) => {
    if (allWordsUsedObj[word]) {
      wordsUsed[word] = allWordsUsedObj[word];
    }
  });

  if (Object.keys(wordsUsed).length) {
    return wordsUsed;
  }

  return 'Congrats! You didn\'t use any of the words you were avoiding!';
}


// make call to Words API
export function getDefs(word, callback) {
  const wordsAPI = `https://wordsapiv1.p.mashape.com/words/${word}`;
  const response = {};
  // get definitions and part of speech
  $.ajax({
    url: wordsAPI,
    type: 'GET',
    async: true,
    success: (data) => {
      if (data.results[1]) {
        response.pos = data.results[1].partOfSpeech;
        response.def = data.results[1].definition;
      } else if (data.results[0]) {
        response.pos = data.results[0].partOfSpeech;
        response.def = data.results[0].definition;
      } else {
        response.pos = '-';
        response.def = '-';
      }
      callback(null, response);
    },
    error: (err) => {
      callback(err, null);
      throw new Error('There was an error making the GET request to the words API!', err);
    },
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-Mashape-Key', wordsAPIKey);
      xhr.setRequestHeader('Accept', 'application/json');
    },
  });
}

export function getSyns(word, callback) {
  const datamuseAPI = `https://api.datamuse.com/words?max=5&rel_syn=${word}`;
  const response = {};
  // get synonyms
  $.ajax({
    type: 'GET',
    url: datamuseAPI,
    async: true,
    dataType: 'JSON',
    success: (data) => {
      response.syns = data;
      callback(null, response);
    },
    error: (err) => {
      callback(err, null);
      throw new Error('Error - ', err);
    },
  });
}

// call helper functions to get analytics
export function analyzeText(userTextInput, wordsToAvoid) {
  const analytics = {};

  // word totals
  const totalOfEachWord = countEachWord(userTextInput);
  analytics.allTotals = totalOfEachWord;

  // words to avoid
  if (wordsToAvoid) {
    analytics.wordsNotAvoided = checkWordsToAvoid(wordsToAvoid, totalOfEachWord);
  } else {
    analytics.wordsNotAvoided = 'No words to avoid';
  }

  // top used words
  const threeMostUsed = topThreeWords(totalOfEachWord);
  analytics.topThree = threeMostUsed;

  return analytics;
}

export function getTextStats(textInput) {
  const counts = {};

  if (textInput.length) {
    counts.charsWithSpace = textInput.length;
  } else {
    counts.charsWithSpace = 0;
  }
  if (textInput.match(/[^\s]/g)) {
    counts.charsNoSpace = textInput.match(/[^\s]/g).length;
  } else {
    counts.charsNoSpace = 0;
  }
  if (textInput.match(/[A-Z]/gi)) {
    counts.charsJustLetters = textInput.match(/[A-Z]/gi).length;
  } else {
    counts.charsJustLetters = 0;
  }
  if (textInput.match(/\S+/g)) {
    counts.words = textInput.match(/\S+/g).length;
  } else {
    counts.words = 0;
  }
  if (textInput.match(/\w[.?!](\s|$)/g)) {
    counts.sentences = textInput.match(/\w[.?!](\s|$)/g).length;
  } else {
    counts.sentences = 1;
  }
  if (textInput.match(/\n/g)) {
    counts.paragraphs = textInput.match(/\n/g).length;
  } else {
    counts.paragraphs = 0;
  }

  counts.charactersPerWord = Math.floor(counts.charsJustLetters / counts.words);
  counts.wordsPerSentence = Math.floor(counts.words / counts.sentences);

  return counts;
}

export function getAutomatedReadabilityIndex(textInput) {
  const conversionTable = {
    1: {
      age: '5-6',
      grade: 'Kindergarten',
    },
    2: {
      age: '6-7',
      grade: 'First Grade',
    },
    3: {
      age: '7-8',
      grade: 'Second Grade',
    },
    4: {
      age: '8-9',
      grade: 'Third Grade',
    },
    5: {
      age: '9-10',
      grade: 'Fourth Grade',
    },
    6: {
      age: '10-11',
      grade: 'Fifth Grade',
    },
    7: {
      age: '11-12',
      grade: 'Sixth Grade',
    },
    8: {
      age: '12-13',
      grade: 'Seventh Grade',
    },
    9: {
      age: '13-14',
      grade: 'Eighth Grade',
    },
    10: {
      age: '14-15',
      grade: 'Ninth Grade',
    },
    11: {
      age: '15-16',
      grade: 'Tenth Grade',
    },
    12: {
      age: '16-17',
      grade: 'Eleventh Grade',
    },
    13: {
      age: '17-18',
      grade: 'Twelfth Grade',
    },
    14: {
      age: '18+',
      grade: 'College',
    },
  };

  const textStats = getTextStats(textInput);

  const ARI = Math.ceil(
    4.71 * (textStats.charsJustLetters / textStats.words) +
    0.5 * (textStats.words / textStats.sentences) - 21.43
  );

  return conversionTable[ARI];
}
