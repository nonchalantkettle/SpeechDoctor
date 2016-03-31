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
        const dictionaryObj = {};
        const dictionaryEntries = result.entry_list.entry[0];
        const definitions = dictionaryEntries.def[0].dt;
        dictionaryObj.pos = dictionaryEntries.fl[0];
        for (let i = 0; i < definitions.length; i ++) {
          if (typeof definitions[i] === 'string') {
            dictionaryObj.def = definitions[i].replace(/:/g, '');
            break;
          } else if (definitions[i]._ && definitions[i]._.length > 2) {
            dictionaryObj.def = definitions[i]._.replace(/:/g, '');
            break;
          } else if (typeof definitions[i].un === 'object') {
            dictionaryObj.def = definitions[i].un[0]._.replace(/:/g, '');
            break;
          }
        }
        if (dictionaryObj.def !== undefined) {
          res.send(dictionaryObj);
        } else {
          dictionaryObj.def = '-';
          res.send(dictionaryObj);
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
        if (thesaurusEntries !== undefined) {
          if (thesaurusEntries.length === 1) {
            if (typeof thesaurusEntries[0].sens[0].syn[0] === 'object') {
              thesaurusObj.syns = thesaurusEntries[0].sens[0].syn[0]._;
            } else {
              thesaurusObj.syns = thesaurusEntries[0].sens[0].syn[0];
            }
          } else {
            if (typeof thesaurusEntries[1].sens[0].syn[0] === 'object') {
              thesaurusObj.syns = thesaurusEntries[1].sens[0].syn[0]._;
            } else {
              thesaurusObj.syns = thesaurusEntries[1].sens[0].syn[0];
            }
          }
        } else {
          thesaurusObj.syns = '-';
        }
        res.send(thesaurusObj);
      });
    });
  },
};
