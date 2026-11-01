import { runLolcode } from "./lolcode.mjs";

const REQUIRED_RANGES = Object.freeze({
  pulse: [42, 167],
  root: [30, 65],
  wave: [0, 3],
  scale: [0, 7],
  rhythm: [0, 5],
  gate: [28, 95],
  voice: [0, 5],
  melody_mode: [0, 11],
  melody_turn: [0, 11],
  hue: [0, 359],
  hue_shift: [24, 240],
  saturation: [55, 100],
  palette: [0, 7],
  symmetry: [2, 15],
  twist: [1, 14],
  bloom: [20, 100],
  eyes: [0, 12],
  eye_shape: [0, 7],
  iris_style: [0, 7],
  pupil_shape: [0, 7],
  iris_hue: [0, 359],
  iris_shift: [20, 200],
  eye_size: [40, 100],
  gaze: [0, 7],
  eye_layout: [0, 5],
  shape: [0, 9],
  size: [36, 100],
  edge: [0, 100],
  motion: [0, 7],
  kinetic_mode: [0, 7],
  kinetic_speed: [20, 100],
  kinetic_depth: [20, 100],
  kinetic_tilt: [0, 7],
  flux_mode: [0, 7],
  name_a: [0, 31],
  name_b: [0, 31],
  name_c: [0, 47],
  name_d: [0, 23],
  name_form: [0, 5],
  ...Object.fromEntries(Array.from({ length: 12 }, (_, index) => [`step_${index}`, [0, 8]])),
});

const NAME_PARTS = Object.freeze({
  first: [
    "CERULEAN", "VELVET", "WOBBLING", "LUMINOUS", "TINY", "ANCIENT", "POLITE", "ILLEGAL",
    "SLEEPY", "ELECTRIC", "WAYWARD", "GENTLE", "FURIOUS", "GLASS", "SECRET", "MOSSY",
    "INFINITE", "PAPER", "SIDEWAYS", "HONEYED", "ASTRAL", "WILD", "LOST", "GIGGLING",
    "ORANGE", "TENDER", "UNLICENSED", "FIZZY", "IMPOSSIBLE", "SOFT", "FERAL", "NEON",
  ],
  second: [
    "POTATO", "MOTH", "TURNIP", "COMET", "PUDDLE", "TEAPOT", "ORBIT", "MARMALADE",
    "THUNDER", "SNAIL", "MOON", "CABBAGE", "GHOST", "SPOON", "CLOUD", "FERN",
    "ACCORDION", "TADPOLE", "MIRROR", "BISCUIT", "PLANET", "MUSHROOM", "KETTLE", "SHADOW",
    "VOLCANO", "PIGEON", "LANTERN", "ONION", "JELLYFISH", "WALRUS", "DOORKNOB", "MELODY",
  ],
  third: [
    "REMEMBERS", "IS LISTENING", "HAS QUESTIONS", "SINGS SIDEWAYS", "REFUSES GRAVITY", "KNOWS A DOOR",
    "OWES YOU SOUP", "DREAMS IN PLAID", "MISPLACED TUESDAY", "HAS SEEN THE MENU", "CALLS AT MIDNIGHT",
    "INVENTED A COLOR", "WANTS YOUR HAT", "KEEPS THE WEATHER", "SPEAKS IN BUBBLES", "ATE THE MAP",
    "PREDICTS SANDWICHES", "FORGOT ITS PASSWORD", "COLLECTS SMALL THUNDER", "IS MOSTLY HARMLESS",
    "WAITS BEHIND THE CURTAIN", "HAS BECOME JAZZ", "BORROWED THE HORIZON", "WIGGLES WITH PURPOSE",
    "IS FULL OF BEES", "FOUND A SHORTCUT", "MARRIED THE OCEAN", "COUNTS BACKWARDS", "KNITS THE STATIC",
    "IS NOT A METAPHOR", "PACKED TOO MANY STARS", "WHISPERS TO FURNITURE", "REJECTS THE PROPHECY",
    "HAS EXCELLENT BOUNDARIES", "IS LEARNING TO FLOAT", "SMELLS FAINTLY PURPLE", "MISHEARD THE COSMOS",
    "RUNS ON CRUMBS", "HAS A UNION CARD", "IS LATE FOR INFINITY", "KEEPS ONE EYE OPEN", "TASTES LIKE RADIO",
    "APPLAUDS THE VOID", "HAS NO FURTHER NOTES", "IS WEARING THE MOON", "LEFT THE OVEN ON",
    "HUMS YOUR TRUE NAME", "BROUGHT EXTRA NAPKINS",
  ],
  fourth: [
    "VELVET WEATHER", "THE OUTER PANTRY", "A BORROWED TUESDAY", "THE LAST PICNIC", "MARMALADE TIME",
    "THE SOUP DIMENSION", "A QUIET APOCALYPSE", "THE CELESTIAL LAUNDROMAT", "LOW ORBIT", "THE GREEN ROOM",
    "A POCKET UNIVERSE", "THE INFINITE HALLWAY", "SECOND BREAKFAST", "THE WRONG TIMELINE", "THE MOON'S ATTIC",
    "A GENTLE EMERGENCY", "THE FORBIDDEN GARDEN", "A VERY LONG MINUTE", "THE STATIC BETWEEN STARS",
    "THE DEPARTMENT OF MYSTERIES", "A SMALLER INFINITY", "THE SUBMERGED LIBRARY", "THE NEON MEADOW",
    "THE UNFINISHED PARADE",
  ],
});

export const WAVEFORMS = Object.freeze(["SINE", "TRIANGLE", "SQUARE", "SAWTOOTH"]);
export const SHAPE_NAMES = Object.freeze([
  "BLOOM", "STAR", "RIPPLE", "GEAR", "CRYSTAL", "AMOEBA", "RIBBON", "PORTAL", "CROWN", "JELLY",
]);

function creatureName(values) {
  const adjective = NAME_PARTS.first[values.name_a];
  const noun = NAME_PARTS.second[values.name_b];
  const action = NAME_PARTS.third[values.name_c];
  const realm = NAME_PARTS.fourth[values.name_d];
  const forms = [
    `THE ${adjective} ${noun} ${action}`,
    `${adjective} ${noun} OF ${realm}`,
    `THE ${noun} ${action} IN ${realm}`,
    `${adjective} ${noun}, ${action}`,
    `${noun} NUMBER ${values.name_d + 3}: ${action}`,
    `${realm}'S ${adjective} ${noun}`,
  ];
  return forms[values.name_form];
}

export function hashPhrase(phrase) {
  const normalized = phrase.normalize("NFKC").trim().toLocaleLowerCase("en-US");
  if (!normalized) throw new Error("The oracle requires at least one visible character");

  let hash = 0x811c9dc5;
  for (const character of normalized) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function parseScore(lines, seed, phrase) {
  if (!Array.isArray(lines)) throw new TypeError("Oracle output must be an array of lines");
  const values = {};

  for (const line of lines) {
    const match = /^([a-z][a-z0-9_]*)=(-?\d+(?:\.\d+)?)$/i.exec(line.trim());
    if (!match) throw new Error(`Malformed oracle output: ${line}`);
    const key = match[1].toLowerCase();
    if (!(key in REQUIRED_RANGES)) throw new Error(`Unexpected oracle field: ${key}`);
    if (key in values) throw new Error(`Duplicate oracle field: ${key}`);
    values[key] = Number(match[2]);
  }

  for (const [key, [minimum, maximum]] of Object.entries(REQUIRED_RANGES)) {
    const value = values[key];
    if (!Number.isInteger(value) || value < minimum || value > maximum) {
      throw new Error(`Oracle field ${key} escaped its range`);
    }
  }

  const steps = Array.from({ length: 12 }, (_, index) => values[`step_${index}`]);
  return Object.freeze({
    seed,
    phrase,
    pulse: values.pulse,
    root: values.root,
    wave: values.wave,
    waveform: WAVEFORMS[values.wave].toLowerCase(),
    scale: values.scale,
    rhythm: values.rhythm,
    gate: values.gate,
    voice: values.voice,
    melodyMode: values.melody_mode,
    melodyTurn: values.melody_turn,
    hue: values.hue,
    hueShift: values.hue_shift,
    saturation: values.saturation,
    palette: values.palette,
    symmetry: values.symmetry,
    twist: values.twist,
    bloom: values.bloom,
    eyes: values.eyes,
    eyeShape: values.eye_shape,
    irisStyle: values.iris_style,
    pupilShape: values.pupil_shape,
    irisHue: values.iris_hue,
    irisShift: values.iris_shift,
    eyeSize: values.eye_size,
    gaze: values.gaze,
    eyeLayout: values.eye_layout,
    shape: values.shape,
    shapeName: SHAPE_NAMES[values.shape],
    size: values.size,
    edge: values.edge,
    motion: values.motion,
    kineticMode: values.kinetic_mode,
    kineticSpeed: values.kinetic_speed,
    kineticDepth: values.kinetic_depth,
    kineticTilt: values.kinetic_tilt,
    fluxMode: values.flux_mode,
    steps: Object.freeze(steps),
    name: creatureName(values),
  });
}

export function composeScore(source, phrase) {
  const cleanPhrase = phrase
    .normalize("NFKC")
    .trim()
    .slice(0, 72)
    .toLocaleLowerCase("en-US");
  const seed = hashPhrase(cleanPhrase);
  const { output } = runLolcode(source, { INPUT_SEED: seed });
  return parseScore(output, seed, cleanPhrase);
}
