import $ from 'jquery';
/**
 * Helper functions for custom text analytics
 */

// get each word's word count
function countEachWord(textInput) {
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
  const wordsToIgnore = /the\b|a\b|an\b|and\b/;

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
export function getSyns(word) {
  const thesaurusAPI = `http://words.bighugelabs.com/api/2/d799893fe70fb4c0ee98fdc6a3f48e76/${word}/json`;

  $.ajax({
    type: 'GET',
    url: thesaurusAPI,
    dataType: 'JSONP',
    success: (data) => {
      console.log(data);
    },
  });
}

// call helper functions to get analytics
export function analyzeText(userTextInput, wordsToAvoid) {
  const analytics = {};

  // word totals
  const totalOfEachWord = countEachWord(userTextInput);
  analytics.allTotals = totalOfEachWord;
  // analytics.getSyns = function(word) {
  //   return getSyns(word);
  // };

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
