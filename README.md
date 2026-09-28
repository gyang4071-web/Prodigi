# Prodigi Paid Ads character assets

These are production-ready transparent PNG character assets for the interactive office scene.

## Folder structure

- `assets/team/` — 3 separate pose options for each person
- `source_sheets/` — original 3-pose sheets
- `team.json` — names, roles, sample humorous notes, asset paths

## People

- Lilit — `lilit_01.png`, `lilit_02.png`, `lilit_03.png`
- Maria Petrosyan — `maria_01.png`, `maria_02.png`, `maria_03.png`
- Stepan — `stepan_01.png`, `stepan_02.png`, `stepan_03.png`
- Albert Azaryan — `albert_01.png`, `albert_02.png`, `albert_03.png`
- Gevorg Gasparyan — `gevorg_01.png`, `gevorg_02.png`, `gevorg_03.png`

## Instructions for Claude Code

Use these files as separate DOM image layers over the approved `office.png`.

Do NOT merge the characters into the office image.

Each character must remain independently clickable and configurable with:
`x`, `y`, `scale`, `zIndex`, `image`, `name`, `role`, `note`.

All five characters belong only in the upper-right Paid Ads area under / near `WE BUILD`.
Do not place them near Coffee Corner.

Choose the pose that fits the furniture and perspective best. The character card should appear beside the selected character and include name, role, short humorous note, and `View memories`.
