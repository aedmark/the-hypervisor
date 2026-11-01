# Decisions

This append-only record holds choices that a future session might otherwise re-litigate.

## D-001 Static site with no project dependencies  (2026-10-17, status: accepted)

**Context:** The product must be browser-based, portable, and zero dependency.

**Decision:** Ship authored HTML, CSS, JavaScript modules, and LOLCODE directly. Use no package manager, bundler, framework, remote font, CDN asset, analytics service, or server runtime.

**Alternatives:** A framework starter would speed common UI work but add a build and dependency chain. A desktop wrapper would weaken the immediate browser-toy quality.

**Consequences:** The app needs a static HTTP origin and must implement its own narrow interpreter. Browser-native APIs define the compatibility floor.

## D-002 Execute a purpose-built LOLCODE subset in the browser  (2026-10-17, status: accepted)

**Context:** Standard LOLCODE has no browser graphics or Web Audio surface, while LOLCODE must retain a causal role in the product.

**Decision:** `src/oracle.lol` owns generative score arithmetic. `src/lolcode.mjs` implements only the 1.2 constructs required by that spell and fails on all unsupported statements.

**Alternatives:** Translating LOLCODE by hand into JavaScript would make it decorative. Shipping a compiled full interpreter would increase size and build complexity. Calling a server-side interpreter would violate the local zero-dependency boundary.

**Consequences:** Compatibility claims remain narrow. Every new language construct requires interpreter tests before the spell can use it.

## D-003 Phrase determinism is a product contract  (2026-10-17, status: accepted)

**Context:** A repeatable creature gives the toy memory-like character without storing user data.

**Decision:** Normalize each phrase with NFKC, trim it, case-fold with the fixed `en-US` locale, hash it with 32-bit FNV-1a, and pass that seed to the spell. The same normalized phrase must produce the same score.

**Alternatives:** Fresh randomness offers novelty but erases identity. Persisted random results require storage and migration rules.

**Consequences:** Changes to normalization, hashing, score formulas, name tables, or scale mapping are compatibility changes and require an explicit superseding decision.

## D-004 One score drives a ten-second paired omen  (2026-10-17, status: superseded by D-005)

**Context:** Sound and image need shared causality, and a browser toy benefits from a bounded encounter.

**Decision:** The score controls waveform, root, pulse, eight melodic steps, hue, symmetry, twist, bloom, eyes, and name. Web Audio plays for ten seconds while the Canvas creature continues as a quiet visual presence.

**Alternatives:** Endless playback risks fatigue. A generic audio analyser would make the image react to volume without sharing compositional structure.

**Consequences:** Replay repeats the same omen. Future length or parameter changes must preserve the shared-score invariant.

## D-005 Continuous loops and expanded creature grammar  (2026-10-17, status: accepted)

**Context:** The first hands-on review found that ten seconds ended too quickly and narrow visual, musical, and naming ranges made repeats visible.

**Decision:** Keep an omen sounding until it is muted, replaced, restarted, or the page closes. Expand the LOLCODE score to twelve melodic steps, eight scales, six rhythms, six voice stacks, ten shape families, 65 sizes, eight palette grammars, broader motion and form ranges, and a six-template ceremonial name grammar.

**Alternatives:** A longer fixed duration still ends without user intent. Fresh randomness would create variety at the cost of deterministic identity. Cosmetic host-side variation would weaken LOLCODE's causal role.

**Consequences:** Phrase outputs from the initial prototype intentionally change under this pre-release schema expansion. Continuous audio increases the importance of visible mute behavior and clean replacement scheduling. The shared-score and phrase-determinism invariants remain intact for the new schema.

## D-006 Eyes are a composed anatomy  (2026-10-17, status: accepted)

**Context:** Maintainer review found that changing only eye count made the eyes read as repeated stamps across otherwise varied creatures.

**Decision:** Extend the LOLCODE score with eye silhouette, iris treatment, pupil geometry, iris hue and shift, eye size, gaze, and layout. Render eight silhouettes, eight iris treatments, eight pupil geometries, six layouts, eight gaze directions, and per-eye color shifts from those fields.

**Alternatives:** Host-side random styling would weaken determinism and LOLCODE ownership. A single larger eye vocabulary without layout or color variation would preserve the repeated-stamp problem.

**Consequences:** Pre-release phrase outputs change again because the schema gained new fields. Eye rendering is more complex and requires real-browser visual review under P4-01. The score boundary validates every anatomy field before Canvas receives it.

## D-007 Motion is bounded topology  (2026-10-17, status: superseded in part by D-008)

**Context:** Hands-on review found that body motion was dominated by one shared rhythmic pulse. Creatures needed seed-specific kinetic behavior and the spirit of self-contained higher-dimensional objects: always changing, never escaping their own boundaries.

**Decision:** Extend the LOLCODE score with kinetic family, speed, depth, tilt, and boundary-flux family. Canvas renders eight internal motion systems—a projected rotating tesseract, nested frames, ribbons, chord web, dimensional grid, contour membrane, gyroscope, and crystal network—and eight independently animated silhouette-flux grammars. Clamp the silhouette radius to a hard envelope and clip every internal system to the current body path. Retain a much smaller audio-synchronous pulse as connective tissue rather than the primary motion.

**Alternatives:** More pulse speeds would preserve the sameness. Host-side randomness would weaken deterministic identity and LOLCODE ownership. Unclipped geometry would create visual variety but violate the requested self-contained form.

**Consequences:** Pre-release phrase outputs change because the score schema gains new fields. Geometry is computationally richer and needs real-browser performance and visual review under P4-01. Reduced-motion mode freezes both boundary and kinetic phase while retaining the complete still composition.

## D-008 Pair sound and image by score, not beat scaling  (2026-10-17, status: accepted)

**Context:** A maintainer screencast showed beat-periodic hard update bands and compression-like jumps even after the whole-creature scale envelope was reduced from six percent to 1.2 percent peak-to-peak. Moving the complete translucent, glowing geometry together still produced a large synchronous repaint that read as jitter rather than life.

**Decision:** Remove audio-pulse-driven visual scaling. Sound and image remain one creature because the immutable LOLCODE score determines both systems; visual motion comes from boundary flux, kinetic cores, orbital drift, and eye behavior rather than direct beat resizing.

**Alternatives:** Further reducing or filtering the scale envelope would preserve a weak version of the observed artifact. Driving only opacity or bloom would still make a large canvas region change on every beat. A frequency analyser would add coupling and complexity without addressing the aesthetic problem.

**Consequences:** The pulse field controls audio tempo and displayed metadata, not Canvas geometry. Creature size no longer oscillates with each beat, while all seed-specific visual kinetics remain intact. P4-01 should confirm the result in-browser and under screen recording.

## D-009 Loudness is a session control, not creature identity  (2026-10-17, status: accepted)

**Context:** Listening review found many generated voices difficult to hear even with high system volume. Raising every oscillator independently would change voice balance and could make dense stacks clip, while a fixed global increase would offer no accommodation for different devices or listeners.

**Decision:** Raise the shared dry-mix target from `0.19` to `0.28`, route both dry and delayed signals through the existing compressor, and add a keyboard-accessible `0..100` master-volume slider after compression. Start at `82`, which maps to unity output gain; use a perceptual curve bounded below `1.4` gain at maximum. Ramp live changes over 18 milliseconds to avoid zipper noise. Keep this session-local control outside the LOLCODE score.

**Alternatives:** Per-voice mixer controls add interface and state complexity before the voices have completed listening review. A simple linear gain makes the quiet half of a slider less useful. Persisting volume would require a new storage contract.

**Consequences:** The default dry mix is roughly 47 percent stronger before output gain, with additional user-controlled headroom. Creature determinism is unchanged. The slider resets on reload, and P4-01 must still listen for clipping, harsh compressor pumping, and device-specific loudness.

## D-010 Melody is a named twelve-step motif  (2026-10-17, status: accepted)

**Context:** The original loop selected twelve scale degrees but did not give most creatures a legible melodic identity. Workshop direction called for deterministic repeating melodies with explicit arpeggio and chromatic vocabularies.

**Decision:** Add LOLCODE-owned melody-family and rotation fields. Resolve them in a pure music module to one frozen twelve-semitone sequence per creature. Provide twelve named families: seeded scale walk; major, minor, diminished, augmented, and minor-seventh arpeggios; ascending, descending, and interleaved chromatic motion; circle-of-fifths motion; whole-tone motion; and a glass interval ladder. Cache the resolved motif on the active audio transport and repeat it modulo twelve.

**Alternatives:** Extending only the scale table would add pitch sets without giving phrases recognizable contour. Freshly generating notes each loop would weaken identity. A user-facing sequencer would turn a one-gesture oracle into a composition tool before the core listening experience is mature.

**Consequences:** Pre-release phrase audio changes because the score schema gains two fields and most phrases select a new motif. The same normalized phrase remains deterministic under the new schema. The score readout names the motif, and exact tests pin representative arpeggio and chromatic sequences.

## D-011 The interface is a symmetrical storybook cabinet  (2026-10-17, status: accepted)

**Context:** Art direction moved from a dark futuristic interface toward Futura-led geometric typography and the composed, symmetrical, theatrical qualities associated with meticulously staged storybook cinema.

**Decision:** Reframe the application as a centered specimen cabinet. Give the creature a bounded apparition chamber; use strict bilateral composition, formal folio and specimen labels, double rules, flat theatrical color blocks, dusty rose, buttercream, burgundy, and institutional teal. Use a Futura-first local font stack throughout, with compatible geometric sans-serif fallbacks. Preserve the generative Canvas as the only illustration and use no film imagery, copied production design, remote assets, or unlicensed font binary.

**Alternatives:** Applying only a new color palette would leave the asymmetrical futuristic layout intact. Shipping Futura from an unverified source would violate the local dependency boundary and risk distributing proprietary font software. Recreating a particular film frame would make the design derivative rather than product-specific.

**Consequences:** The canvas is no longer a fixed full-screen background and its coordinate system is centered inside the stage. The page becomes taller but gives controls, creature, and reading distinct theatrical acts. Exact Futura rendering depends on the user's installed fonts; Century Gothic and other local geometric faces preserve the intended proportions when it is absent. P4-01 must verify composition at real desktop and phone sizes.

## Open questions

- **Q-001** Which static host and public domain should carry the first release? (asked 2026-10-17; blocks P6-01; recommendation: decide after P4-01)
