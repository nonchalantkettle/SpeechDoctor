const Q = require('q');
const jwt = require('jsonwebtoken');
const api  = require('../../API_KEYS');
const httpRequest = require('http-request')
const parseString = require('xml2js').parseString;

module.exports = {
  dictionary: (req, res, next) => {
    const reqWord = req.params.word;
    const webster = `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${reqWord}?key=${api.websterDictionaryAPI}`;
    httpRequest.get(webster, function (err, data) {
      if (err) {
        console.error("THERE WAS AN ERROR : ", err);
        return;
      }
      parseString(data.buffer, function(err, result){
        var dictionaryEntries = result.entry_list.entry[0].def[0].dt;
        var def;
        for(var i = 0 ; i<dictionaryEntries.length ; i++){
          if(typeof dictionaryEntries[i] === 'string'){
            res.send(dictionaryEntries[i]);
            return;
          }
        }
        for(var j = 0 ; j<dictionaryEntries.length ; j++){
          if(dictionaryEntries[j]._.length > 2){
            res.send(dictionaryEntries[j]._);
            return;
          }
        }
      });
    });
  },

  thesaurus: (req, res, next) => {
    const reqWord = req.params.word;
    const webster = `http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/${reqWord}?key=${api.websterThesaurusAPI}`;
    httpRequest.get(webster, function (err, data) {
      if (err) {
        res.send(err);
      }
      parseString(data.buffer, function(err, result){
        var thesaurusEntries = result.entry_list.entry;
        var thesaurusObj = {
          pos: thesaurusEntries[0].fl[0],
          syns: thesaurusEntries[0].sens[0].syn[0],
        };
        res.send(thesaurusObj);
      });
    })
  }
}
