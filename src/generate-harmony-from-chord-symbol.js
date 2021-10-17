const notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
const octaves = notes.concat(notes);
const isMinor = char => char === char.toLowerCase();


const generateHarmonyFromChordSymbols = ({ sections }) => {
  const getRootAndHarmonize = symbol => {
    const root = notes.indexOf(symbol.toLowerCase());
    // minor = root, root +  3, root + 7
    // major = root, root + 4, root + 7
    const third = isMinor(symbol) ? root + 3 : root + 4;
    const fifth = root + 7;
    const getOctave = noteIndex => noteIndex < 12 ? '4' : '5';
    return [root, third, fifth].map(noteIndex => octaves[noteIndex] + getOctave(noteIndex))
  }

  return sections.map(section => section.map(getRootAndHarmonize))
}

export { generateHarmonyFromChordSymbols };