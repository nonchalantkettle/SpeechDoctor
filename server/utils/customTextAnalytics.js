/**
 * Helper functions for custom text analytics
 */

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

export function checkWordsToAvoid(wordsToAvoidArr, textInput) {
  const allWords = countEachWord(textInput);
  const wordsUsed = {};

  wordsToAvoidArr.forEach((word) => {
    if (allWords[word]) {
      wordsUsed[word] = allWords[word];
    }
  });

  return wordsUsed;
}

function topThreeWords(wordCountObject) {
  const wordsToIgnore = /\b[a-z0-9]{1,2}\b|the\b|and\b|that\b|are\b|for\b|have/gi;

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

// call helper functions to get analytics
export function analyzeText(userTextInput, wordsToAvoid) {
  const analytics = {};

  const totalOfEachWord = countEachWord(userTextInput);
  analytics.allTotals = totalOfEachWord;

  if (wordsToAvoid) {
    analytics.wordsNotAvoided = checkWordsToAvoid(wordsToAvoid, totalOfEachWord);
  } else {
    analytics.wordsNotAvoided = 'No words to avoid';
  }

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
      score: 1,
    },
    2: {
      age: '6-7',
      grade: 'First Grade',
      score: 2,
    },
    3: {
      age: '7-8',
      grade: 'Second Grade',
      score: 3,
    },
    4: {
      age: '8-9',
      grade: 'Third Grade',
      score: 4,
    },
    5: {
      age: '9-10',
      grade: 'Fourth Grade',
      score: 5,
    },
    6: {
      age: '10-11',
      grade: 'Fifth Grade',
      score: 6,
    },
    7: {
      age: '11-12',
      grade: 'Sixth Grade',
      score: 7,
    },
    8: {
      age: '12-13',
      grade: 'Seventh Grade',
      score: 8,
    },
    9: {
      age: '13-14',
      grade: 'Eighth Grade',
      score: 9,
    },
    10: {
      age: '14-15',
      grade: 'Ninth Grade',
      score: 10,
    },
    11: {
      age: '15-16',
      grade: 'Tenth Grade',
      score: 11,
    },
    12: {
      age: '16-17',
      grade: 'Eleventh Grade',
      score: 12,
    },
    13: {
      age: '17-18',
      grade: 'Twelfth Grade',
      score: 13,
    },
    14: {
      age: '18+',
      grade: 'College',
      score: 14,
    },
  };

  const textStats = getTextStats(textInput);

  let ARI = Math.ceil(
    4.71 * (textStats.charsJustLetters / textStats.words) +
    0.5 * (textStats.words / textStats.sentences) - 21.43
  );

  if (ARI > 14) {
    ARI = 14;
  } else if (ARI < 1) {
    ARI = 1;
  }

  return conversionTable[ARI];
}
