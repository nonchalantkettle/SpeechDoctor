const promptGenerator = {
  randomPromptGenerator() {
    const promptChoices = [
      'the quick brown fox jumped over the lazy dog',
      'she sells seashells by the seashore',
      'how much wood could a woodchuck chuck if a woodchuck could chuck wood',
    ];
    return promptChoices[Math.floor(Math.random() * promptChoices.length)];
  },

  writingPromptGenerator() {
    const writingPrompts = [
      'What is your opinion on climate change?',
      'What is your opinion on tax levels?',
      'Describe something technical that you know a lot about in simple terms.',
      'If you could live in another era of time, which would you choose and why?',
    ];
    const randomInd = Math.floor(Math.random() * writingPrompts.length);
    return writingPrompts[randomInd];
  },

  speakingPromptGenerator() {
    const speakingPrompts = [
      'Tell me about yourself.',
      'What are some obstacles you\'ve overcome to get where you are today?',
      'What is your greatest strength?',
      'What is your greatest weakness?',
      'Describe something technical that you know a lot about in simple terms.',
    ];
    const randomInd = Math.floor(Math.random() * speakingPrompts.length);
    return speakingPrompts[randomInd];
  },
};

module.exports = promptGenerator;
