# Session Handoff

Read this first when resuming work. Protocol: [AGENTS.md](../AGENTS.md). Plan: [ROADMAP.md](../ROADMAP.md). Architecture: [ARCHITECTURE.md](ARCHITECTURE.md). Decisions: [DECISIONS.md](DECISIONS.md). Tests: [TESTING.md](TESTING.md).

## Current state

_Last updated: 2026-10-17, session 10, on `main`: the Futura-led symmetrical storybook redesign is implemented and structurally verified._

**Where things stand:** P1, P2, and P5-01 through P5-06 are implemented. A phrase deterministically drives a LOLCODE-generated score, one of twelve named repeating melody motifs, one of ten Canvas body families, one of eight bounded silhouette-flux grammars, one of eight internal kinetic systems, expressive composed eye anatomy, a multi-template ceremonial name, and a continuously looping Web Audio composition with live master volume. The experience now lives inside a Futura-led symmetrical storybook cabinet with a framed central apparition. The largest gap is sensory and accessibility review in real browsers and on a real phone.

**Verified** (2026-10-17, initial repository, local Linux environment)

| Suite | Result |
| --- | --- |
| `node --test tests/*.test.mjs` | **17/17 behavioral and structural checks passed** |
| `python3 tools/check_docs.py` | **0 errors, 0 warnings across 13 documents** |

**What works**

- The static page accepts a phrase and offers surprise, replay, and mute controls (P2-03).
- The phrase becomes a stable unsigned seed under the D-003 normalization contract.
- A purpose-built interpreter executes `src/oracle.lol` and rejects unsupported syntax with line numbers (P1-02, D-002).
- The spell emits validated audio, visual, and naming parameters (P2-01).
- Canvas and Web Audio share the same immutable score (P2-02, D-004).
- Audio loops continuously until mute, restart, replacement, or page close (D-005).
- The expanded grammar covers twelve-note phrases, eight scales, six rhythms and voices, ten shapes, broader size and color ranges, and six name templates (P5-01, D-005).
- Eye silhouette, iris treatment and color, pupil shape, layout, size, and gaze vary deterministically (P5-02, D-006).
- Body boundaries continuously deform through eight clamped flux grammars while eight seed-selected kinetic systems move independently inside them (P5-03, D-007).
- Canvas geometry does not resize on audio beats; sound and image remain paired through their shared immutable score (D-008).
- The large exterior glow is isolated to the body fill; kinetic lines, rings, and eyes no longer inherit its expensive per-primitive blur.
- Master volume adjusts the active loop smoothly from silence through a compressor-protected boost; the default dry mix is substantially louder (P5-04, D-009).
- Every phrase selects and rotates one of twelve named twelve-note motifs, including five arpeggio and three chromatic families, then repeats it exactly (P5-05, D-010).
- The responsive page shell uses a Futura-first geometric stack, symmetrical theatrical framing, and a centered bounded apparition chamber without remote or proprietary assets (P5-06, D-011).
- Runtime assets are local and dependency-free (D-001).

**Not verified**

- No visual or listening review has been recorded in a real browser.
- Firefox, Safari, mobile browsers, assistive technology, and reduced-motion presentation remain P4 work.
- No public hosting or domain exists.

**Gotchas**

- Serve the directory over HTTP. A direct `file:` URL cannot fetch `src/oracle.lol`.
- The interpreter deliberately implements a subset. Read D-002 before extending the spell.
- Changes to hash, normalization, formula constants, scale, or name tables can break phrase identity. D-005 through D-007 record intentional pre-release compatibility breaks.

## Next steps

1. Complete P4-01 with a real browser and listening review.
2. Complete P4-02 with keyboard, reduced-motion, contrast, and screen-reader checks.
3. Choose between P3-01 shareable URLs and P3-02 still-image export based on observed use.

## Open questions

- Q-001 blocks P6-01: choose public hosting and domain after browser review.

## Session log

### Session 10: 2026-10-17: the oracle checks into a peculiar hotel

**Contributor:** Codex with maintainer direction

**Goal:** Replace the futuristic interface with a Futura-led, meticulously symmetrical, storybook-cinematic presentation.

**Done:** P5-06

**Changed:** Rebuilt the page shell as a bordered specimen cabinet with centered geometric typography, a dusty rose–buttercream–teal palette, mirrored ornaments, formal folio labels, a dedicated arched apparition chamber, centered Canvas coordinates, and responsive multi-act controls and readings.

**Decisions:** D-011

**Verified:** Seventeen Node checks passed, including the Futura-first stack, centered stage, symmetrical grid, and existing accessibility and dependency markers; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Subjective fidelity, exact installed-font rendering, vertical rhythm, text collision, and responsive composition in real browsers remain P4-01 work.

**Problems:** Futura is proprietary and unavailable as a distributable project asset; the design uses installed Futura when present and a documented local geometric fallback stack otherwise.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** Review the cabinet at desktop and phone widths, then continue P4-01.

### Session 9: 2026-10-17: twelve notes walk into infinity

**Contributor:** Codex with maintainer direction

**Goal:** Give every creature a deterministic repeating melody with explicit arpeggio and chromatic vocabularies.

**Done:** P5-05

**Changed:** Added LOLCODE-selected melody family and rotation fields, a pure twelve-step motif engine, twelve named melodic families, transport-level motif caching, and a visible motif label in the score readout.

**Decisions:** D-010

**Verified:** Sixteen Node checks passed, including all score ranges, coverage of all twelve families across 256 phrases, and exact major-arpeggio plus ascending and descending chromatic sequences; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Musicality, loop transitions, register balance, and the score-label layout in real browsers remain P4-01 work.

**Problems:** None at handoff update time.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** Listen across all twelve named motifs, then continue P4-01.

### Session 8: 2026-10-17: give the oracle a volume knob

**Contributor:** Codex with maintainer direction

**Goal:** Make quiet generated voices easier to hear and give the listener direct loudness control.

**Done:** P5-04

**Changed:** Raised the dry-mix target from `0.19` to `0.28`, routed the wet delay through the compressor, and added a labeled 0–100 master-volume slider with a perceptual gain curve, live 18-millisecond ramps, and a stronger default setting.

**Decisions:** D-009

**Verified:** Fifteen Node checks passed, including control labeling, default value, stronger mix, compressor routing, and live gain-ramp markers; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Perceived loudness, clipping, compressor pumping, and slider presentation in real browsers remain P4-01 and P4-02 work.

**Problems:** None at handoff update time.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** Listen to several sparse and dense creatures at default and maximum volume, then continue P4-01.

### Session 7: 2026-10-17: take the fog machine off the linework

**Contributor:** Codex with maintainer direction

**Goal:** Correct persistent animation judder without sacrificing kinetic motion or audio playback.

**Done:** Incidental Canvas performance fix; no roadmap item added.

**Changed:** Scoped the large silhouette shadow blur to the single body-fill pass and explicitly disabled shadow blur inside the kinetic renderer. Previously every internal line, ring, and eye inherited a blur as large as 62 pixels, multiplying per-frame compositing work.

**Decisions:** No new durable product decision; this corrects leaked Canvas state.

**Verified:** Fourteen Node checks passed, including a regression check that the body blur is restored before kinetic linework; the continuous audio scheduler marker still passes; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Follow-up subjective motion and audio playback in the maintainer's browser remain P4-01.

**Problems:** The prior beat-decoupling change removed one synchronized repaint but did not address the underlying leaked blur cost. A page reload also stops the old audio context; playback requires a new Summon gesture under browser autoplay policy.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** Summon the same phrase after reload and record frame pacing; then continue P4-01.

### Session 6: 2026-10-17: let the geometry keep its footing

**Contributor:** Codex with maintainer direction

**Goal:** Remove the beat-periodic jitter still visible after smoothing the scale envelope.

**Done:** Incidental rendering correction; no roadmap item added.

**Changed:** Removed audio-pulse-driven Canvas scaling completely. Boundary flux, internal kinetic systems, eye behavior, and slow orbital drift are unchanged.

**Decisions:** D-008 supersedes the retained beat-scale portion of D-007.

**Verified:** Reviewed the supplied 3.25-second, 757×648 H.264 screencast frame by frame; hard vertical update bands coincide with whole-creature beat changes. Thirteen Node checks passed, including a regression check that the visual draw path does not consume `score.pulse`; documentation checker reported 0 errors and 0 warnings.

**Not verified:** A follow-up capture of the corrected renderer and cross-browser sensory review remain P4-01.

**Problems:** The first correction made the scale envelope mathematically smooth but did not prevent large synchronous repaints from reading as jitter.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** Re-record the same creature, then continue P4-01.

### Session 5: 2026-10-17: no more macroblock heartbeat

**Contributor:** Codex with maintainer direction

**Goal:** Remove the glitchy, compression-artifact quality from sound-synchronous body movement.

**Done:** Incidental rendering fix; no roadmap item added.

**Changed:** Replaced the six-percent, eighth-power beat spike with a continuously differentiable 1.2% peak-to-peak sinusoidal scale envelope. Independent boundary flux and kinetic-core movement are unchanged.

**Decisions:** No new durable decision; this corrects the pulse treatment already defined by D-007.

**Verified:** Thirteen Node checks passed, including a regression marker for the smooth envelope; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Subjective visual quality in a real browser remains P4-01.

**Problems:** None at handoff update time.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** P4-01.

### Session 4: 2026-10-17: impossible geometry with boundaries

**Contributor:** Codex with maintainer direction

**Goal:** Replace pulse-dominated blobs with complex self-contained forms that have their own kinetic movement.

**Done:** P5-03

**Changed:** Added five deterministic kinetic score fields, eight silhouette-flux grammars, and eight internal motion systems. The tesseract renderer rotates in four dimensions before two-stage perspective projection; every system is clipped to the currently deforming body. Reduced the shared beat pulse so it no longer dominates motion.

**Decisions:** D-007

**Verified:** Twelve Node checks passed, including 256-phrase categorical coverage and structural boundary containment; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Subjective motion quality, frame rate, clipping, and legibility in real browsers.

**Problems:** None at handoff update time.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** P4-01.

### Session 3: 2026-10-17: eyes with opinions

**Contributor:** Codex with maintainer direction

**Goal:** Replace repeated stamped eyes with varied anatomy and expression.

**Done:** P5-02

**Changed:** Added eight eye silhouettes, eight iris treatments, eight pupil geometries, six layouts, eight gaze directions, size variation, and per-eye color shifts driven by new LOLCODE score fields.

**Decisions:** D-006

**Verified:** Eleven Node checks passed, including score ranges and 256-phrase coverage of every categorical eye variant; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Subjective eye rendering, clipping, and legibility in real browsers.

**Problems:** None at handoff update time.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** P4-01.

### Session 2: 2026-10-17: the omen keeps humming

**Contributor:** Codex with maintainer direction

**Goal:** Loop sound continuously and expand repeated musical, visual, and naming outcomes.

**Done:** P5-01; expanded P2-02 behavior

**Changed:** Added a continuous look-ahead audio scheduler, twelve-note phrases, eight scales, six rhythms and voice stacks, ten shape families, larger visual ranges, and six ceremonial name templates with larger vocabularies.

**Decisions:** D-005 supersedes the fixed-duration part of D-004.

**Verified:** Eleven Node checks passed; documentation checker and whitespace review passed.

**Not verified:** Listening continuity, subjective mix, animation quality, and cross-browser behavior.

**Problems:** None at handoff update time.

**Left undone:** P3, P4, and P6 roadmap items.

**Next session should start with:** P4-01.

### Session 1: 2026-10-17: first summoning

**Contributor:** Codex with maintainer direction

**Goal:** Specify and prototype a whimsical zero-dependency browser app in LOLCODE.

**Done:** P1-01, P1-02, P2-01, P2-02, P2-03

**Changed:** Created the project specification, interpreter, spell, score boundary, interface, animation, audio instrument, and tests.

**Decisions:** D-001 through D-004

**Verified:** Nine Node checks passed; documentation checker reported 0 errors and 0 warnings.

**Not verified:** Real browser visuals, listening quality, mobile devices, Firefox, Safari, and assistive technology.

**Problems:** Standard LOLCODE lacks browser media APIs; D-002 assigns score composition to LOLCODE and instrument duties to a narrow host.

**Left undone:** P3, P4, P5, and P6 roadmap items.

**Next session should start with:** P4-01.
