export default function randomPromptGenerator() {
  const promptChoices = [
    'the quick brown fox jumped over the lazy dog',
    'she sells seashells by the seashore',
    'how much wood could a woodchuck chuck if a woodchuck could chuck wood',
  ];
  return promptChoices[Math.floor(Math.random() * promptChoices.length)];
}
