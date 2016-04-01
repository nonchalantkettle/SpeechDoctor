/* eslint strict: 0*/

const httpRequest = require('http-request');
const parseString = require('xml2js').parseString;

const api = require('../../API_KEYS');

module.exports = {
  dictionary: (req, res) => {
    'use strict';
    const reqWord = req.params.word;
    const webster = `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${reqWord}?key=${api.websterDictionaryAPI}`;
    httpRequest.get(webster, (err, data) => {
      if (err) {
        return;
      }
      parseString(data.buffer, (error, result) => {
        if (error) {
          res.send(error);
          return;
        }
        const dictionaryObj = {};

        // If the word is not a word, or not in the dictionary
        if (!result || result.entry_list === undefined) {
          dictionaryObj.def = '-';
          dictionaryObj.pos = '-';
        } else if (result.entry_list.entry === undefined) {
          // this might still have something useful in it
          dictionaryObj.def = '-';
          dictionaryObj.pos = '-';
          // Sets POS: sometimes it is in an unusual place
        } else if (result.entry_list.entry[0] && result.entry_list.entry[0].dt === undefined) {
          if (result.entry_list.entry[0].fl !== undefined) {
            dictionaryObj.pos = result.entry_list.entry[0].fl[0];
          } else if (result.entry_list.entry[1] !== undefined) {
            dictionaryObj.pos = result.entry_list.entry[1].fl[0];
          }
          // Set DEF: when this object has more than 1 entry, the first entry is usually antonyms
          if (result.entry_list.entry[0].def !== undefined) {
            // When the entires are very long, some of the entries for dt are stings
            // the strings are the best options
            if (result.entry_list.entry.length > 6) {
              if (result.entry_list.entry[1].def[0]) {
                if (result.entry_list.entry[1].def[0].dt !== undefined) {
                  if (result.entry_list.entry[1].def[0].dt.length) {
                    for (let k = 0; k < result.entry_list.entry[1].def[0].dt.length; k++) {
                      if (typeof result.entry_list.entry[1].def[0].dt[k] === 'string') {
                        dictionaryObj.def = result.entry_list.entry[1].def[0].dt[k];
                        break;
                      }
                    }
                  }
                }
                // when all items are objects, the first entry is the best
                // so after the loop, if the def is not defined,
                // go with the def entry in the first object
                if (dictionaryObj.def === undefined) {
                  if (result.entry_list.entry[1].def[0].dt.length) {
                    if (result.entry_list.entry[1].def[0].dt[0]._) {
                      dictionaryObj.def = result.entry_list.entry[1].def[0].dt[0]._;
                    }
                  }
                }
              }
            } else {
              // Otherwise if there are fewer than 6 entires
              // the first entry is best
              const dictionaryEntries = result.entry_list.entry[0];
              if (dictionaryEntries.def[0].dt) {
                const definitions = dictionaryEntries.def[0].dt;
                if (definitions.length) {
                  for (let i = 0; i < definitions.length; i ++) {
                    // This may still need to be tested
                    // res.send(result.entry_list.entry);
                    if (typeof definitions[i] === 'string') {
                      dictionaryObj.def = definitions[i];
                      break;
                    } else if (definitions[i]._) {
                      if (definitions[i]._.length && definitions[i]._.length > 2) {
                        if (definitions[1]) {
                          if (definitions[1].un) {
                            // With more than 2 entire defs?, the first 2 are usually antonyms
                            if (definitions[1].un[0]) {
                              if (definitions[2].un[0]._) {
                                dictionaryObj.def = definitions[2].un[0]._;
                              }
                            }
                          } else {
                            dictionaryObj.def = definitions[i]._;
                          }
                          // Breaks out of the loop after assigment
                          // or if no defs are found
                          break;
                        }
                      } else if (typeof definitions[i].un === 'object') {
                        if (definitions[i].un[0]) {
                          if (definitions[i].un[0]._) {
                            dictionaryObj.def = definitions[i].un[0]._;
                          }
                        }
                        break;
                      } else if (definitions[i]._.length > 2) {
                        if (definitions[i]._) {
                          dictionaryObj.def = definitions[i]._;
                        }
                        break;
                      }
                    }
                  }
                }
              }
            }
            // When the entry has this configuration
            // the def is broken up into two entries
          } else if (result.entry_list.entry[0].cx !== undefined) {
            const first = result.entry_list.entry[0].cx[0].cl[0];
            const second = result.entry_list.entry[0].cx[0].ct[0];
            const empty = ' ';
            dictionaryObj.def = first + empty + second;
          }

          if (dictionaryObj.def === undefined) {
            // Final condition where nothing was found
            // or def set to be undefined
            dictionaryObj.def = '-';
          }

          if (dictionaryObj.pos === undefined) {
            // final condition where nothing was found
            // or pos set incorrectly
            dictionaryObj.pos = '-';
          }
        }

        // If both def and pos are strings, replace can be used.
        // Otherwise the method replace fails
        if (typeof dictionaryObj.def === 'string') {
          dictionaryObj.def = dictionaryObj.def.replace(/\:|\[|\]|\(|\)/g, '');
        }

        if (typeof dictionaryObj.pos === 'string') {
          dictionaryObj.def = dictionaryObj.def.replace(/\:|\[|\]|\(|\)/g, '');
        }

        res.send(dictionaryObj);
      });
    });
  },

  thesaurus: (req, res) => {
    const reqWord = req.params.word;
    const webster = `http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/${reqWord}?key=${api.websterThesaurusAPI}`;
    httpRequest.get(webster, (err, data) => {
      if (err) {
        res.send(err);
        return;
      }

      parseString(data.buffer, (error, result) => {
        if (error) {
          res.send(error);
          return;
        }

        const thesaurusEntries = result.entry_list.entry;
        const thesaurusObj = {};
        if (thesaurusEntries !== undefined) {
          // If the length is one, the first entry is best
          if (thesaurusEntries.length === 1) {
            if (typeof thesaurusEntries[0].sens[0].syn[0] === 'object') {
              thesaurusObj.syns = thesaurusEntries[0].sens[0].syn[0]._;
            } else {
              thesaurusObj.syns = thesaurusEntries[0].sens[0].syn[0];
            }
          } else {
            // When the entries get very long, the first entry is the best
            if (thesaurusEntries.length > 5) {
              if (thesaurusEntries[0].sens[0] !== undefined) {
                // ** this may still need to be tested **
                if (thesaurusEntries[0].sens[0].syn) {
                  if (thesaurusEntries[0].sens[0].syn[0]) {
                    if (thesaurusEntries[0].sens[0].syn[0]._) {
                      thesaurusObj.syns = thesaurusEntries[0].sens[0].syn[0]._;
                    }
                  }
                }
              }

              // If the first item is undefined, and the second item is an object
              // the second entry is best
            } else if (typeof thesaurusEntries[1].sens[0].syn[0] === 'object') {
              thesaurusObj.syns = thesaurusEntries[1].sens[0].syn[0]._;
            } else {
              thesaurusObj.syns = thesaurusEntries[1].sens[0].syn[0];
            }
          }

          // When 'suggestions' are available, they take precedence over syns
        } else if (result.entry_list.suggestion !== undefined) {
          thesaurusObj.syns = result.entry_list.suggestion.join(', ');
        }

        // Final condition if syns was not set
        // or set incorrectly
        if (thesaurusObj.syns === undefined) {
          thesaurusObj.syns = '-';
        }

        if (typeof thesaurusObj.syns === 'string') {
          thesaurusObj.syns = thesaurusObj.syns.replace(/[\:\[\]\(\)]/g, '');
        }
        res.send(thesaurusObj);
      });
    });
  },
};
