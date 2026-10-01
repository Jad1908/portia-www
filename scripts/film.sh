#!/usr/bin/env sh
# Make the web encode and the poster for the launch film.
#
#   pnpm film <render.mp4> [poster-second]
#
# Takes a finished render from the film project and writes:
#
#   public/film/portia-launch-v2-1080.mp4   1080p60, the one every visitor plays
#   src/assets/film/launch-poster.jpg       one real frame, the resting state
#
# There is one encode, not a lighter one for phones: the film is a screen
# recording, and at 720p its small text is what goes first.
#
# `public/film/` is gitignored and `.assetsignore`d: the dev server plays the
# copy there, and the deploy never uploads it. Production serves the same file
# from R2 — upload it, and point `PUBLIC_FILM_BASE` at the bucket.
#
# The moov atom goes to the front (`+faststart`) so playback starts before the
# download finishes. Nothing is retimed, cropped or graded: this is a re-encode
# of the render and no more, which is the showcase's rule 1 applied to a film.
#
# When the cut changes, bump the `v2` in the name here and in `film.yaml`.
# A new file gets a new URL; the old one is cached at the edge and stays that
# way.

set -eu

SRC="${1:?usage: pnpm film <render.mp4> [poster-second]}"
POSTER_AT="${2:-10}"
OUT="public/film"
POSTER="src/assets/film/launch-poster.jpg"

mkdir -p "$OUT" "$(dirname "$POSTER")"

ffmpeg -y -v error -i "$SRC" \
  -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -g 120 \
  -c:a aac -b:a 128k -movflags +faststart \
  "$OUT/portia-launch-v2-1080.mp4"

ffmpeg -y -v error -ss "$POSTER_AT" -i "$SRC" -frames:v 1 -q:v 2 "$POSTER"

ls -la "$OUT" "$POSTER"
