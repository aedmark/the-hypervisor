import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runLolcode } from "../src/lolcode.mjs";
import { MELODY_NAMES, melodyFor } from "../src/music.mjs";
import { composeScore, hashPhrase, parseScore } from "../src/score.mjs";

const source = await readFile(new URL("../src/oracle.lol", import.meta.url), "utf8");

test("the LOLCODE spell produces every required score field", () => {
  const score = composeScore(source, "the moon owes me five dollars");
  assert.equal(score.steps.length, 12);
  assert.ok(score.name.length > 12);
  assert.ok(score.pulse >= 42 && score.pulse <= 167);
  assert.ok(score.hue >= 0 && score.hue <= 359);
  assert.ok(score.symmetry >= 2 && score.symmetry <= 15);
  assert.ok(score.shape >= 0 && score.shape <= 9);
  assert.ok(score.size >= 36 && score.size <= 100);
  assert.ok(score.scale >= 0 && score.scale <= 7);
  assert.ok(score.eyeShape >= 0 && score.eyeShape <= 7);
  assert.ok(score.irisStyle >= 0 && score.irisStyle <= 7);
  assert.ok(score.pupilShape >= 0 && score.pupilShape <= 7);
  assert.ok(score.irisHue >= 0 && score.irisHue <= 359);
  assert.ok(score.eyeLayout >= 0 && score.eyeLayout <= 5);
  assert.ok(score.kineticMode >= 0 && score.kineticMode <= 7);
  assert.ok(score.kineticSpeed >= 20 && score.kineticSpeed <= 100);
  assert.ok(score.kineticDepth >= 20 && score.kineticDepth <= 100);
  assert.ok(score.kineticTilt >= 0 && score.kineticTilt <= 7);
  assert.ok(score.fluxMode >= 0 && score.fluxMode <= 7);
  assert.ok(score.melodyMode >= 0 && score.melodyMode <= 11);
  assert.ok(score.melodyTurn >= 0 && score.melodyTurn <= 11);
  assert.equal(melodyFor(score).length, 12);
});

test("the same normalized phrase summons the same creature", () => {
  const first = composeScore(source, "  A Cucumber With Excellent Boundaries  ");
  const second = composeScore(source, "a cucumber with excellent boundaries");
  assert.deepEqual(first, second);
});

test("different phrases produce different seeds and scores", () => {
  const first = composeScore(source, "Tuesday smells faintly purple");
  const second = composeScore(source, "the wallpaper knows jazz");
  assert.notEqual(first.seed, second.seed);
  assert.notDeepEqual(first.steps, second.steps);
});

test("a phrase batch exercises the expanded name, shape, sound, eye, and kinetic spaces", () => {
  const scores = Array.from({ length: 256 }, (_, index) => composeScore(source, `omen ${index}`));
  assert.ok(new Set(scores.map((score) => score.name)).size >= 250);
  assert.equal(new Set(scores.map((score) => score.shape)).size, 10);
  assert.equal(new Set(scores.map((score) => score.scale)).size, 8);
  assert.equal(new Set(scores.map((score) => score.eyeShape)).size, 8);
  assert.equal(new Set(scores.map((score) => score.irisStyle)).size, 8);
  assert.equal(new Set(scores.map((score) => score.pupilShape)).size, 8);
  assert.equal(new Set(scores.map((score) => score.eyeLayout)).size, 6);
  assert.equal(new Set(scores.map((score) => score.kineticMode)).size, 8);
  assert.equal(new Set(scores.map((score) => score.fluxMode)).size, 8);
  assert.equal(new Set(scores.map((score) => score.melodyMode)).size, 12);
});

test("arpeggio and chromatic motifs are exact twelve-note loops", () => {
  const base = { scale: 0, steps: Array(12).fill(0), melodyTurn: 0 };
  assert.deepEqual(melodyFor({ ...base, melodyMode: 1 }), [0, 4, 7, 12, 16, 12, 7, 4, 0, 7, 12, 19]);
  assert.deepEqual(melodyFor({ ...base, melodyMode: 5 }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.deepEqual(melodyFor({ ...base, melodyMode: 6 }), [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  assert.equal(MELODY_NAMES.length, 12);
});

test("empty phrases are rejected at the input boundary", () => {
  assert.throws(() => hashPhrase("   "), /visible character/);
});

test("malformed or out-of-range score output is rejected", () => {
  assert.throws(() => parseScore(["pulse=999"], 1, "bad omen"), /escaped its range|Oracle field/);
  assert.throws(() => parseScore(["surprise=4"], 1, "bad omen"), /Unexpected oracle field/);
});

test("unsupported LOLCODE fails with a useful line number", () => {
  assert.throws(
    () => runLolcode("HAI 1.2\nHOW DUZ I WAT\nKTHXBYE"),
    /LOLCODE line 2: Unsupported statement/,
  );
});
