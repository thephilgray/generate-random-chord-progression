
import * as Tone from 'tone'
import { generateHarmonyFromChordSymbols } from './generate-harmony-from-chord-symbol';
import { generateChordProgression } from './generate-random-chord-progression';

const validateInput = str => {
  let errorMessage = '';
  let arr;
  try {
    arr = str.split(',')
  } catch (error) {
    errorMessage = 'Input must be a series of numbers delimited by commas'
    return errorMessage;
  }

  if (!arr.every(Number) || !arr.every(n => n <= 9)) {
    errorMessage = 'Only numbers 1-9';
    return errorMessage;
  }
}

const form = document.getElementById('form');
const inputEl = document.getElementById('sections');
const validationEl = form.querySelector('.validation');
const formatInput = i => i.split(',').map(n => Number.parseInt(n));
const outputEl = document.getElementById('output');
const repeatEl = document.getElementById('repeat');
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let state;

const setState = (newState = {}) => {
  state = {
    harmonizedSections: [],
    ...newState
  }
};

const printChords = ({ sections }) => {
  const printSingleChord = ({ sectionIndex }) => (chord, i, arr) => {
    const defaultSeparatorLength = 6;
    const separatorLength = chord.includes('#') ? defaultSeparatorLength - 1 : defaultSeparatorLength;
    const separator = i < arr.length - 1 ? '-'.repeat(separatorLength) : '';
    return `<span class="section-${sectionIndex}-chord-${i}">
    <span class="chord">${chord}</span>
    ${separator ? `<span class="chord-separator">${separator}</span>` : ""}
    </span>`
  }

  const str = sections
    .map((section, i) => `<p>${section
      .map(printSingleChord({ sectionIndex: i }))
      .join("")}</p>`)
    .join("");
  outputEl.innerHTML = str;
}
// [[0, 1, 2], [0, 1, 2], [0, 1, 2, 3, 4]]

// 0, 1, 2 – index
// 4, 5, 6, index + previous section length + 1
// 8, 9, 10, 11, 12


const play = ({ harmonizedSections }) => {
  synth.releaseAll(0);
  const now = Tone.now();
  let lastStartTime = 0;
  harmonizedSections.forEach((section, sectionIndex, sectionArr) => {
    section.forEach((chord, chordIndex, chordArr) => {
      // const startTime = now + ((sectionIndex * (sectionIndex > 0 ? sectionArr[sectionIndex].length : 0) + 1) + chordIndex);
      const startTime = now + lastStartTime;
      lastStartTime += 1;
      // TODO: highlight the chord for the active voice
      //   const printedChord = document.querySelector(`.section-${sectionIndex}-chord-${chordIndex}`);
      //   printedChord.classList.add('active');

      synth.triggerAttack(chord, startTime);
      synth.triggerRelease(chord, startTime + 1);
    })
  })
}

const handleOnSubmit = e => {
  validationEl.textContent = '';
  e.preventDefault();
  const input = inputEl.value;
  const validationMessage = validateInput(input);

  if (!validationMessage) {
    // do something with input
    const sections = generateChordProgression(formatInput(input));
    printChords({ sections });
    const harmonizedSections = generateHarmonyFromChordSymbols({ sections });
    setState({ harmonizedSections });
    play({ harmonizedSections });
  }

  validationEl.textContent = validationMessage;
  inputEl.value = '';

}

repeatEl.addEventListener('click', e => play(state));

form.addEventListener('submit', handleOnSubmit)
