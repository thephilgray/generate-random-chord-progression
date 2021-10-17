# Generate Random Chord Progression

Ugly proof of concept that generates a series of random (_[GOOGLE: not truly random](https://www.google.com/search?q=math.random+is+not+random&oq=Math.random+is+not+random)_) chords based on user input for a number of and sections, and plays them in the browser using [Tone.js](https://tonejs.github.io/). Made for fun as fast as possible with as little code and external dependencies as possible.

## Setup

cd into the cloned repo and run `npm install`

project uses parcel for config-free bundling. run `npm run build` to build `dist` directory, or run `npm run start` to build and serve on localhost.

## Example Usage

**Scenario**: A user wants to generate 5 random chords.

In the input with the label `Enter the number of chords per section (separated by a comma):`, they type `5` and press the enter/return key.

Something like the following appears below the form as each chords is played for ~1s, one after the other:

```
C ------ A ------ F# ----- g ------ C
```

All the chord symbols are either major or minor triads, where capital letters are major chords (with a major third) and lower-case letters are minor chords (with a minor third). Only sharps (#) are used to denote accidentals.

**Scenario**: A user wants to generate chords for a song with an intro, verse, bridge, and chorus. The intro should have 2 chords, the verse should have 6 chords, the bridge should have 3 chords, and the chorus should have 4 chords.

In the input with the label `Enter the number of chords per section (separated by a comma):`, they type `2,6,3,4` and press the enter/return key.

Something like the following appears below the form as each chords is played for ~1s, one after the other:

```
a# ----- e

g# ----- f# ----- e ------ G# ----- a# ----- D

E ------ a# ----- e

a# ----- b ------ e ------ e

```

## Todo

- [ ] other triads such as diminished and sustained
- [ ] options for limiting random chords to one or more keys
- [ ] options for smart or opinionated modulation from one key to the next
- [ ] options to add random and smart or opinionated sevenths
- [ ] options for random and smart inversions (such as closest)
- [ ] options for tempo and rhythmic pattern
- [ ] improve the chord notation and display and highlight the chord being played
