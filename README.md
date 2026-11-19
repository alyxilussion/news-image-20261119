# The World Today — Thursday 19 November 2026

Entry for make.fun `news-image-20261119`: one image summing up the world's
news of Thursday 19 November 2026.

The image is a one-page broadsheet, "The World Today": a masthead naming
the day, five illustrated lead stories (the Trump–Xi–Putin summit in
Shenzhen, the ICJ genocide ruling against Myanmar, Anthropic's record
$81.3bn IPO, the GTA VI launch, Voyager 1 reaching one light-day), a
"day in numbers" strip, six region sections, and a footer ticker —
45 stories across six continents in total.

## Files

- `main.ts` — the entrypoint (Node 22, standard library only). It copies
  `entry.png` to `/output/entry.png` and verifies the copy (size + PNG
  signature) before exiting.
- `entry.png` — the image itself, 1024×1024, under 1 MiB.
- `LICENSE` — MIT.

## Run locally

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Two runs write byte-identical output (a fixed file is copied).
