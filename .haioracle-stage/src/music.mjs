const SCALES = Object.freeze([
  [0, 2, 3, 5, 7, 9, 10, 12, 14],
  [0, 2, 4, 7, 9, 12, 14, 16, 19],
  [0, 1, 4, 5, 7, 8, 11, 12, 13],
  [0, 3, 5, 6, 7, 10, 12, 15, 17],
  [0, 2, 4, 6, 8, 10, 12, 14, 16],
  [0, 1, 3, 5, 7, 8, 10, 12, 13],
  [0, 2, 3, 6, 7, 9, 10, 12, 14],
  [0, 4, 7, 11, 14, 16, 19, 23, 24],
]);

const MOTIFS = Object.freeze([
  null,
  [0, 4, 7, 12, 16, 12, 7, 4, 0, 7, 12, 19],
  [0, 3, 7, 10, 12, 15, 12, 10, 7, 3, 0, 7],
  [0, 3, 6, 9, 12, 9, 6, 3, 0, 6, 9, 15],
  [0, 4, 8, 12, 16, 12, 8, 4, 0, 8, 12, 20],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  [0, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5, 6],
  [0, 7, 14, 9, 4, 11, 6, 13, 8, 3, 10, 5],
  [0, 2, 4, 6, 8, 10, 12, 10, 8, 6, 4, 2],
  [0, 3, 7, 10, 12, 10, 7, 3, 0, 7, 10, 15],
  [0, 1, 5, 6, 10, 11, 15, 14, 9, 8, 4, 3],
]);

export const MELODY_NAMES = Object.freeze([
  "SEED WALK",
  "MAJOR ARP",
  "MINOR ARP",
  "DIM ARP",
  "AUG ARP",
  "CHROMATIC UP",
  "CHROMATIC DOWN",
  "CHROMATIC ORBIT",
  "FIFTHS",
  "WHOLE TONE",
  "MINOR 7TH",
  "GLASS LADDER",
]);

export function melodyFor(score) {
  if (score.melodyMode === 0) {
    const scale = SCALES[score.scale];
    return Object.freeze(score.steps.map((scaleStep, index) => (
      scale[scaleStep] + (index >= 8 ? 12 : 0)
    )));
  }

  const motif = MOTIFS[score.melodyMode];
  if (!motif) throw new RangeError("Unknown melody mode");
  return Object.freeze(Array.from({ length: 12 }, (_, index) => (
    motif[(index + score.melodyTurn) % motif.length]
  )));
}
