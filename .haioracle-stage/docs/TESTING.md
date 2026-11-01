# Testing

Automated checks prove determinism, boundary validation, the required LOLCODE subset, and static project structure. They do not judge whether the creature looks compelling or the mix sounds good.

## Suites

| Suite | File | Proves | Does not prove | Needs |
| --- | --- | --- | --- | --- |
| Oracle logic | `tests/oracle.test.mjs` | deterministic hashing, valid score ranges, batch name/body/eye/scale/kinetic/melody diversity, exact twelve-note arpeggio and chromatic motifs, negative interpreter behavior | browser API integration or sensory quality | Node 20 or newer |
| Static structure | `tests/static.test.mjs` | required assets, basic labels, centered apparition-stage and Futura-stack markers, continuous scheduler and master-volume markers, bounded silhouette and clipped-core markers, no audio-driven visual resizing, scoped body glow, no remote runtime references | computed accessibility tree, scheduler timing, perceived loudness, or visual quality | Node 20 or newer |
| Documentation | `tools/check_docs.py` | no placeholders, broken local links, or unknown roadmap and decision references | factual accuracy of every claim | Python 3 |

The fast set and full automated set are currently identical:

```bash
node --test tests/*.test.mjs
python3 tools/check_docs.py
```

Expected results from specific runs live in `HANDOFF.md`.

## Before a run

- No setup, install, account, secret, fixture, or persistent state is required.
- Run commands from the repository root.
- Tests write no project files.
- A browser review requires serving the directory over HTTP. Direct `file:` loading cannot fetch the spell.

## Adding a check

- Put interpreter and score behavior in `tests/oracle.test.mjs`.
- Put asset and shell invariants in `tests/static.test.mjs`.
- Assert returned values and rejected boundaries instead of message wording where practical.
- Make a new behavioral check fail against the broken implementation before trusting it.

## Change-to-check matrix

| Changed area | Minimum checks | Additional evidence |
| --- | --- | --- |
| Documentation only | documentation checker | read changed claims against code |
| LOLCODE spell, interpreter, hash, or score | full automated set | confirm an existing phrase stays compatible or document the break |
| Canvas or audio rendering | full automated set | manual browser review with sound |
| Controls, layout, or accessibility | full automated set | keyboard, narrow viewport, reduced motion, and screen-reader review |
| Dependency boundary | full automated set | inspect network requests and record an accepted decision |

## Manual checks before a release

1. Serve the repository and summon three phrases in current Chrome, Firefox, and Safari.
2. Confirm sound starts only after a gesture, loops without an audible gap, mutes immediately, restarts, and is replaced cleanly by a new summon.
3. Move master volume through zero, the default 82 percent, and maximum using pointer and keyboard; confirm live ramps are smooth and the loudest dense voice does not clip or pump.
4. Listen to every named motif family; confirm each forms a recognizable twelve-note loop and that restarts return to its first note.
5. Confirm repeated text produces identical metadata and creature structure.
6. Summon enough creatures to inspect every eye silhouette, iris treatment, pupil geometry, and layout for clipping or illegibility.
7. Inspect all eight kinetic cores and silhouette-flux families for distinct motion, boundary containment, legibility, and stable frame rate.
8. Use keyboard-only controls at desktop and narrow mobile widths.
9. Confirm the cabinet remains bilaterally balanced, the apparition stays centered in its frame, labels do not collide, and the Futura fallback remains legible at desktop and phone widths.
10. Enable reduced motion and confirm the interface remains legible, calm, and frozen at a representative phase.
11. Inspect the network panel for unexpected outbound requests.

## Known pitfalls

- Web Audio tests require human listening. An oscillator scheduling without throwing does not prove a good mix.
- Timer throttling in background tabs can affect scheduling; the short look-ahead window limits the damage but requires browser review.
- Canvas snapshots are sensitive to browser, graphics stack, pixel ratio, and time. Test score inputs structurally and review the actual animation manually.
- FNV-1a collisions are possible. The seed is an identity affordance, not a cryptographic identifier.
