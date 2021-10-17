const getRandomNumber = (limit) => Math.floor(Math.random() * limit);
const getRandomBoolean = () => Boolean(getRandomNumber(2));

const getTonalityAndAccidental = m => {
  const canBeSharp = !['e', 'b'].includes(m);
  const hasAccidental = getRandomBoolean() && canBeSharp;
  const tonality = getRandomBoolean() ? m.toUpperCase() : m;
  return tonality + (hasAccidental ? '#' : '');
}

const getChord = () => [0, 1, 2, 3, 4, 5, 6]
  .map(i => String.fromCharCode(i + 97))[getRandomNumber(7)]
  .replace(/./, getTonalityAndAccidental);

const generateChordProgression = (sections) => sections
  .map(numberOfChords => Array(numberOfChords))
  .map(arr => arr.fill(0).map(getChord));


export { generateChordProgression };