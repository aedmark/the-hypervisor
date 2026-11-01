# HAI, ORACLE!

Feed it a thought. See what hums back.

HAI, ORACLE! turns a short phrase into a deterministic looping audiovisual creature. The same normalized phrase always produces the same name, twelve-note repeating motif, pulse, waveform, rhythm, color grammar, shape, size, motion, and questionable anatomy. Motifs range across seeded scale walks, five arpeggio families, chromatic ascents, descents and orbits, fifths, whole-tone motion, and a glassy interval ladder. Each creature deforms through one of eight bounded silhouette grammars while one of eight kinetic geometries folds, spins, or travels inside it. Eyes vary by count, silhouette, arrangement, size, gaze, iris color and treatment, and pupil geometry.

The score is composed by [`src/oracle.lol`](src/oracle.lol). A small browser-side interpreter executes the LOLCODE, validates its output, and hands the score to Canvas and Web Audio. Everything runs locally. There are no packages, remote assets, analytics, cookies, accounts, or network calls after the static files load.

The interface is a symmetrical storybook specimen cabinet built around a Futura-first geometric type stack, dusty theatrical colors, formal labels, and a framed apparition chamber. No proprietary font file is distributed: browsers use an installed Futura face when available and fall back to compatible local geometric sans-serifs.

## Run it

From the repository root:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000), enter a phrase, and choose **SUMMON**. Sound requires the button press because browsers block unsolicited audio.

The composition loops until you summon another creature, mute it, or close the page. **RESTART LOOP** returns the current creature to the first note. The master-volume slider starts at a stronger listening level and can move continuously from silence to a compressor-protected boost.

Opening `index.html` directly through a `file:` URL is unsupported. The browser must fetch the separate LOLCODE spell from the same HTTP origin.

## Verify it

```bash
node --test tests/*.test.mjs
python3 tools/check_docs.py
```

Both checks use standard-library tools and install nothing.

## Technical promise

- LOLCODE owns the generative decisions.
- JavaScript interprets, validates, draws, and plays those decisions.
- Phrase processing stays inside the browser.
- The first prototype stores nothing between visits.
- The interpreter supports the documented subset used by the spell. It makes no claim of full LOLCODE compatibility.

Project state and next work live in [`docs/HANDOFF.md`](docs/HANDOFF.md) and [`ROADMAP.md`](ROADMAP.md).
