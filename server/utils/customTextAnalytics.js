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
  const copiedObj = wordCountObject;
  const mostCommonWords = {};
  const wordKeys = Object.keys(copiedObj);
  let i = 0;

  wordKeys.forEach((word) => {
    if (word.match(wordsToIgnore)) {
      delete copiedObj[word];
    }
  });

  function findCurrentLargest(wordObj) {
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
      findCurrentLargest(copiedObj);
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
  return wordsUsed;
}

/* for the linter: */
const someWordObj = countEachWord('hi i am a owrkdwejlkjf oujfijlk  lkjh ihihihi hi hi hi');
const avoid = ['i'];
checkWordsToAvoid(avoid, someWordObj);
const topThree = topThreeWords(someWordObj); // apparently modifies original someWordObj
console.log(topThree);
