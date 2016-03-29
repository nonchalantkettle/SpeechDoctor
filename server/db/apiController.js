/* eslint strict: 0*/

const api = require('../../API_KEYS');
const httpRequest = require('http-request');
const parseString = require('xml2js').parseString;

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
        const dictionaryEntries = result.entry_list.entry[0].def[0].dt;
        for (let i = 0; i < dictionaryEntries.length; i ++) {
          if (typeof dictionaryEntries[i] === 'string') {
            res.send(dictionaryEntries[i]);
            return;
          }
        }
        for (let j = 0; j < dictionaryEntries.length; j ++) {
          if (dictionaryEntries[j]._.length > 2) {
            res.send(dictionaryEntries[j]._);
            return;
          }
        }
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
        if (thesaurusEntries.length === 1) {
          thesaurusObj.syns = thesaurusEntries[0].sens[0].syn[0];
          thesaurusObj.pos = thesaurusEntries[0].fl[0];
        } else {
          thesaurusObj.syns = thesaurusEntries[1].sens[0].syn[0];
          thesaurusObj.pos = thesaurusEntries[1].fl[0];
        }
        res.send(thesaurusObj);
      });
    });
  },
};
