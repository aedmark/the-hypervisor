# Roadmap

Item IDs are permanent. `[ ]` is open, `[~]` is active, `[x]` is done, and `[-]` is dropped.

## Phase 1: Foundations

Goal: establish a documented, dependency-free project whose LOLCODE boundary is honest and testable.

- [x] P1-01 Adopt the Manifold documentation template and replace every placeholder with project truth. Verified by `python3 tools/check_docs.py` on 2026-10-17.
- [x] P1-02 Implement the required LOLCODE 1.2 subset with line-numbered failures for unsupported syntax. Verified by `tests/oracle.test.mjs` on 2026-10-17.

## Phase 2: Core experience

Goal: summon one coherent audiovisual creature from one phrase.

- [x] P2-01 Generate a deterministic, validated score in `src/oracle.lol`. Verified by deterministic and range tests on 2026-10-17.
- [x] P2-02 Render the score as a continuously looping Web Audio composition and animated Canvas creature. Expanded from a ten-second playback after maintainer feedback on 2026-10-17; subjective browser review remains P4-01.
- [x] P2-03 Provide responsive summon, surprise, mute, and replay controls with accessible labels and status text. Static checks passed 2026-10-17; assistive-technology review remains P4-02.

## Phase 3: Output and sharing

Goal: let a creature travel without adding accounts or remote storage.

- [ ] P3-01 Encode the phrase in a shareable URL while preserving the deterministic privacy model. Origin: product workshop, 2026-10-17.
- [ ] P3-02 Export a still image containing the creature name and originating phrase. Origin: prototype follow-up, 2026-10-17.

## Phase 4: Quality

Goal: verify the sensory experience beyond structural automation.

- [ ] P4-01 Review animation, mix, controls, and responsive layout in current Chrome, Firefox, Safari, and a real phone. Origin: unverified prototype boundary, 2026-10-17.
- [ ] P4-02 Test keyboard navigation, reduced motion, contrast, screen-reader announcements, and mute behavior with real assistive technology. Origin: accessibility review, 2026-10-17.

## Phase 5: Later experiments

Goal: expand only where additional complexity creates more play.

- [x] P5-01 Expand musical, visual, and naming variation after the first hands-on review exposed repetition. Added twelve-note phrases, eight scales, six rhythms and voice stacks, ten shape families, broader size and color ranges, and six name grammars on 2026-10-17. Verified by batch diversity tests; sensory review remains P4-01.
- [x] P5-02 Give eyes distinct silhouettes, arrangements, iris colors and treatments, pupil geometries, sizes, and gaze behavior. Added after maintainer review on 2026-10-17 and verified across the phrase batch; visual review remains P4-01.
- [x] P5-03 Replace pulse-dominated blobs with bounded kinetic geometries. Added eight independently animated internal systems, including a projected tesseract, and eight silhouette-flux grammars on 2026-10-17. Score coverage and clipping invariants are automated; visual review remains P4-01.
- [x] P5-04 Add an accessible master-volume control and raise the default mix after listening review found quiet creatures difficult to hear. Added a live 0–100 control, perceptual gain curve, stronger dry mix, and compressor-protected wet path on 2026-10-17; listening review remains P4-01.
- [x] P5-05 Expand deterministic melody into twelve repeating motif families. Added major, minor, diminished, augmented and minor-seventh arpeggios; ascending, descending and interleaved chromatic motifs; fifths, whole-tone, glass-ladder, and seeded scale-walk patterns on 2026-10-17. Exact motif tests pass; listening review remains P4-01.
- [x] P5-06 Redesign the interface as a Futura-led symmetrical storybook cabinet after art-direction review. Added a centered apparition chamber, geometric typography, theatrical pastel palette, mirrored framing, formal specimen labels, and responsive staging on 2026-10-17. Structural checks pass; visual review remains P4-01.

## Phase 6: Release

Goal: give the finished toy a durable public home.

- [ ] P6-01 Choose hosting, domain, and first release version. Publishing requires maintainer approval. Origin: repository setup, 2026-10-17.
