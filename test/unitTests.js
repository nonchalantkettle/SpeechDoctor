const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('custom text analytics methods', () => {

  it('should have a sample test that returns true', () => {
    const sampleTest = true;
    expect(sampleTest).to.be.true;
  });

  // xit('should have an analyzeText method', () => {
  //   expect('analyzeText').to.be.a('function');

  //   let sampleText = 'hi hi hi i\'m some sample text text k';
  //   let sampleAnalytics = analyzeText(sampleText, 'k');

  //   xit('should return an object', () => {
  //     expect(sampleAnalytics.to.be.an('object'));
  //   });

  //   xit('should have an allTotals property that is an object', () => {
  //     expect(sampleAnalytics.to.have.property('allTotals'));
  //     expect(sampleAnalytics.allTotals.to.be.an('object'));

  //     let wordTotals = {
  //       hi: 3,
  //       im: 1,
  //       some: 1,
  //       sample: 1,
  //       text: 2,
  //       k: 1,
  //     };

  //     xit('should return the totals of each word', () => {
  //       for (let word in wordTotals) {
  //         expect(sampleAnalytics.allTotals[word].to.equal(wordTotals[word]));
  //       }
  //     });

  //   });

  //   xit('should have an wordsNotAvoided property that is an object', () => {
  //     expect(sampleAnalytics.to.have.property('wordsNotAvoided'));
  //     expect(sampleAnalytics.wordsNotAvoided.to.be.an('object'));

  //     xit('should return the words and frequencies of words not avoided', () => {
  //       expect(sampleAnalytics.wordsNotAvoided.to.have.property('k'));
  //       expect(sampleAnalytics.wordsNotAvoided.k.to.equal(1));
  //     });
  //   });

  //   xit('should have an topThree property that is an object', () => {
  //     expect(sampleAnalytics.to.have.property('topThree'));
  //     expect(sampleAnalytics.topThree.to.be.an('object'));

  //     let threeMostUsed = {
  //       hi: 3,
  //       text: 2,
  //       im: 1,
  //     };

  //     xit('should return the three most-used words in order', () => {
  //       for (let word in threeMostUsed) {
  //         expect(sampleAnalytics.topThree[word].to.equal(threeMostUsed[word]));
  //       }
  //     });

  //     xit('should ignore "the", "and", "a", and "an"', () => {

  //     });

    // });
  });
