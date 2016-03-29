import $ from 'jquery';
import { websterDictionaryAPI, websterThesaurusAPI } from '../../API_KEYS';

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
  const wordsToIgnore = /\b[a-z]{1,2}\b|the\b|and\b|that\b|are\b/gi;

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

// make call to Words API
// export function getDefs(word, callback) {
//   const wordsAPI = `https://wordsapiv1.p.mashape.com/words/${word}`;
//   const response = {};
//   // get definitions and part of speech
//   $.ajax({
//     url: wordsAPI,
//     type: 'GET',
//     async: true,
//     success: (data) => {
//       if (data.results === undefined) {
//         response.pos = '-';
//         response.def = '-';
//       } else if (data.results[1]) {
//         response.pos = data.results[1].partOfSpeech || '-';
//         response.def = data.results[1].definition || '-';
//       } else if (data.results[0]) {
//         response.pos = data.results[1].partOfSpeech || '-';
//         response.def = data.results[1].definition || '-';
//       }
//       callback(null, response);
//     },
//     error: (err) => {
//       callback(err, null);
//       throw new Error('There was an error making the GET request to the words API!', err);
//     },
//     beforeSend: (xhr) => {
//       xhr.setRequestHeader('X-Mashape-Key', wordsAPIKey);
//       xhr.setRequestHeader('Accept', 'application/json');
//     },
//   });
// }


function xmlToJson(xml) {
  // Create the return object
  let obj = {};
  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    obj = xml.nodeValue;
  }
  // do children
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof(obj[nodeName]) === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}


// export function getDefsFromWebster(word, callback) {
//   console.log("I WAS CALLED IN THE XHTTP REQUEST!")
//   const webster = `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=${websterDictionaryAPI}`;
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//       document.getElementById("demo").innerHTML = xhttp.responseText;
//     }
//   };
//   xhttp.open("GET", webster, true);
//   xhttp.send();
// }

// make call to Webster Dictionary API
// Last resort - use this http://cors.io/?u=
export function getDefsFromWebster(word, callback) {
  const webster = `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=${websterDictionaryAPI}`;
  const response = {};

  $.ajax({
    url: webster,
    type: 'GET',
    data: xmlToJson('jsonp'),
    async: true,
    success: (data) => {
      console.log("IT HAPPENED!")
      const jsonData = xmlToJson(xml);
      response.def = jsonData.entry_list.entry[1].def.dt[0]['#text'];
      response.pos = jsonData.entry_list.entry[1].fl['#text'];
      response.entire = jsonData.entry_list;
      // response.def = data.results[1].definition || '-';
      callback(null, response);
    },
    error: (err) => {
      callback(err, null);
      throw new Error('There was an error making the GET request to the Webster Dictionary!', err);
    },
  });
}

// make call to Webster Thesaurus API
export function getSynFromWebster(word, callback) {
  const webster = `http://cors.io/?u=http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/${word}?key=${websterThesaurusAPI}`;
  // const response = {};

  $.ajax({
    url: webster,
    type: 'GET',
    dataType: 'XML',
    async: true,
    success: (data) => {
      console.log("success in finding !")
      const jsonData = xmlToJson(data);
      //We can get def from jsonData.entry_list.entry[0].sens[0].mc
      const obj = jsonData.entry_list.entry;
      let syns;

      console.log("jsonData.entry_list.entry : ", jsonData.entry_list.entry);

      if(obj.length > 1){
        syns = obj[0].syn
      } else{
        syns = obj.syn['#text']
      }
      callback(null, syns);
    },
    error: (err) => {
      callback(err, null);
      throw new Error('There was an error making the GET request to the Webster Thesaurus!', err);
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
