let should = chai.should();
let expect = chai.expect;

describe('custom text analytics methods', () => {

  it('should have an analyzeText method', () => {
    expect('analyzeText').to.be.a('function');

    let sampleText = 'hi hi hi i\'m some sample text text k';
    let sampleAnalytics = analyzeText(sampleText, 'k');

    it('should return an object', () => {
      expect(sampleAnalytics.to.be.an('object'));
    });

    it('should have an allTotals property that is an object', () => {
      expect(sampleAnalytics.to.have.property('allTotals'));
      expect(sampleAnalytics.allTotals.to.be.an('object'));

      let wordTotals = {
        hi: 3,
        im: 1,
        some: 1,
        sample: 1,
        text: 2,
        k: 1,
      };

      it('should return the totals of each word', () => {
        for (let word in wordTotals) {
          expect(sampleAnalytics.allTotals[word].to.equal(wordTotals[word]));
        }
      });

    });

    it('should have an wordsNotAvoided property that is an object', () => {
      expect(sampleAnalytics.to.have.property('wordsNotAvoided'));
      expect(sampleAnalytics.wordsNotAvoided.to.be.an('object'));

      it('should return the words and frequencies of words not avoided', () => {
        expect(sampleAnalytics.wordsNotAvoided.to.have.property('k'));
        expect(sampleAnalytics.wordsNotAvoided.k.to.equal(1));
      });
    });

    it('should have an topThree property that is an object', () => {
      expect(sampleAnalytics.to.have.property('topThree'));
      expect(sampleAnalytics.topThree.to.be.an('object'));

      let threeMostUsed = {
        hi: 3,
        text: 2,
        im: 1,
      };

      it('should return the three most-used words in order', () => {
        for (let word in threeMostUsed) {
          expect(sampleAnalytics.topThree[word].to.equal(threeMostUsed[word]));
        }
      });

      xit('should ignore "the", "and", "a", and "an"', () => {

      });

    });
  });
