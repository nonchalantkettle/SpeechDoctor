/*
 * Helper functions for custom text analytics
 */

// get each word's word count
function countEachWord( textInput ) {
  // split up input string into arrays by spaces and newline chars
  const whiteSpaceChars = /\s/;
  const allWords = textInput.split(whiteSpaceChars);

  let wordCountObject = {};

  for (var i = 0; i < allWords.length; i++) {
    let currentWord = allWords[i];
    if (!wordCountObject[currentWord]) {
      wordCountObject[currentWord] = 1;
    } else {
      wordCountObject[currentWord] += 1;
    }
  }

  return wordCountObject;
}

// find the top three most-used words, excluding 'the', 'a', 'an', and 'and'
function topThreeWords( wordCountObject ) {
  // remove the and a and and
  const wordsToIgnore = /the|a|an|and/i;

  let mostUsed = '';
  let secondMostUsed = '';
  let thirdMostUsed = '';

  let largest = 0;
  let secondLargest = 0;
  let thirdLargest = 0;

  let topThree = {};

  // assign largest
  for (var word in wordCountObject) {
    if (!word.match(wordsToIgnore)) {
      let currentWordCount = wordCountObject[word];
      if (currentWordCount > largest) {
        largest = currentWordCount;
        mostUsed = word;
      }
    }
  }

  // assign secondLargest
  for (var word in wordCountObject) {
    if (!word.match(wordsToIgnore)) {
      let currentWordCount = wordCountObject[word];
      if (currentWordCount > secondLargest && currentWordCount <= largest && word !== mostUsed) {
        secondLargest = currentWordCount;
        secondMostUsed = word;
      }
    }
  }

  // assign thirdLargest
  for (var word in wordCountObject) {
    if (!word.match(wordsToIgnore)) {
      let currentWordCount = wordCountObject[word];
      if (currentWordCount > thirdLargest && currentWordCount <= secondLargest && word !== secondMostUsed) {
        thirdLargest = currentWordCount;
        thirdMostUsed = word;
      }
    }
  }

  topThree[mostUsed] = largest;
  topThree[secondMostUsed] = secondLargest;
  topThree[thirdMostUsed] = thirdLargest;

  return topThree;
}
