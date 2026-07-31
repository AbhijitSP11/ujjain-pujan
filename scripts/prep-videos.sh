#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# UJJAIN SEVA · video prep
#
# Takes the 3 source videos in public/videos/ and produces:
#   • public/videos/optimized/{name}.mp4   H.264, dense keyframes, scrub-ready
#   • public/videos/optimized/{name}.webm  VP9 variant
#   • public/posters/{name}.webp           first frame  (initial state)
#   • public/posters/{name}-final.webp     last frame   (final state)
#   • public/og-image.webp                 1200x630 social card
#
# Dense keyframes (-g 15) are the whole point: ScrollTrigger sets
# video.currentTime on every scroll tick, and the decoder can only land on a
# keyframe. Sparse keyframes = the scrub stutters between distant I-frames.
#
# Usage:  bash scripts/prep-videos.sh
#         FFMPEG=/path/to/ffmpeg bash scripts/prep-videos.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT/public/videos"
OUT_DIR="$ROOT/public/videos/optimized"
POSTER_DIR="$ROOT/public/posters"

# ── locate ffmpeg ────────────────────────────────────────────────────────────
if [ -n "${FFMPEG:-}" ]; then
  FF="$FFMPEG"
elif command -v ffmpeg >/dev/null 2>&1; then
  FF="ffmpeg"
else
  # winget default install location on Windows
  WINGET_FF=$(ls -d "$LOCALAPPDATA/Microsoft/WinGet/Packages/Gyan.FFmpeg"*/ffmpeg-*/bin/ffmpeg.exe 2>/dev/null | head -n1 || true)
  if [ -n "$WINGET_FF" ]; then
    FF="$WINGET_FF"
  else
    echo "ERROR: ffmpeg not found. Install it (winget install Gyan.FFmpeg) or set FFMPEG=/path/to/ffmpeg" >&2
    exit 1
  fi
fi
FFPROBE="${FF%ffmpeg.exe}ffprobe.exe"
[ -x "$FFPROBE" ] || FFPROBE="${FF%ffmpeg}ffprobe"
command -v "$FFPROBE" >/dev/null 2>&1 || [ -f "$FFPROBE" ] || FFPROBE="ffprobe"

echo "→ ffmpeg: $FF"
mkdir -p "$OUT_DIR" "$POSTER_DIR"

VIDEOS=(ujjain-temple-dawn ujjain-shipra-ghats ujjain-pooja-samagri)

human() { # bytes → human readable
  local b=$1
  if   [ "$b" -gt 1048576 ]; then echo "$(( b / 1048576 )) MB"
  elif [ "$b" -gt 1024 ];    then echo "$(( b / 1024 )) KB"
  else echo "$b B"; fi
}

size_of() { wc -c < "$1" | tr -d ' '; }

TOTAL_BEFORE=0
TOTAL_AFTER=0

for name in "${VIDEOS[@]}"; do
  SRC="$SRC_DIR/$name.mp4"
  if [ ! -f "$SRC" ]; then
    echo "!! missing $SRC — skipping"
    continue
  fi

  echo ""
  echo "══════════════════════════════════════════════════════════"
  echo "  $name"
  echo "══════════════════════════════════════════════════════════"

  BEFORE=$(size_of "$SRC")
  TOTAL_BEFORE=$(( TOTAL_BEFORE + BEFORE ))

  # ── 1+2. H.264, dense keyframes, no audio, ≤1080p, faststart ──────────────
  echo "  [1/5] H.264 scrub-optimised mp4 …"
  "$FF" -y -hide_banner -loglevel error -i "$SRC" \
    -an \
    -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease:flags=lanczos,format=yuv420p" \
    -c:v libx264 -profile:v high -level 4.1 \
    -preset slow -b:v 4M -maxrate 5M -bufsize 8M \
    -g 15 -keyint_min 15 -sc_threshold 0 \
    -movflags +faststart \
    "$OUT_DIR/$name.mp4"

  # ── 3. VP9 / WebM variant ────────────────────────────────────────────────
  echo "  [2/5] VP9 webm …"
  "$FF" -y -hide_banner -loglevel error -i "$SRC" \
    -an \
    -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease:flags=lanczos,format=yuv420p" \
    -c:v libvpx-vp9 -b:v 3M -crf 33 \
    -g 15 -keyint_min 15 \
    -row-mt 1 -deadline good -cpu-used 2 \
    "$OUT_DIR/$name.webm"

  # ── 4a. Poster: FIRST frame (initial state) ──────────────────────────────
  echo "  [3/5] poster · first frame …"
  "$FF" -y -hide_banner -loglevel error -i "$SRC" \
    -vf "scale='min(1920,iw)':-2:flags=lanczos" \
    -frames:v 1 -update 1 -quality 82 -compression_level 6 \
    "$POSTER_DIR/$name.webp"

  # ── 4b. Poster: LAST frame (final state) ─────────────────────────────────
  echo "  [4/5] poster · last frame …"
  "$FF" -y -hide_banner -loglevel error -sseof -0.5 -i "$SRC" \
    -vf "scale='min(1920,iw)':-2:flags=lanczos" \
    -frames:v 1 -update 1 -quality 82 -compression_level 6 \
    "$POSTER_DIR/$name-final.webp"

  echo "  [5/5] done."

  MP4=$(size_of "$OUT_DIR/$name.mp4")
  WEBM=$(size_of "$OUT_DIR/$name.webm")
  P1=$(size_of "$POSTER_DIR/$name.webp")
  P2=$(size_of "$POSTER_DIR/$name-final.webp")
  TOTAL_AFTER=$(( TOTAL_AFTER + MP4 ))

  printf "      source      %10s\n" "$(human "$BEFORE")"
  printf "      mp4         %10s\n" "$(human "$MP4")"
  printf "      webm        %10s\n" "$(human "$WEBM")"
  printf "      poster      %10s\n" "$(human "$P1")"
  printf "      poster-final%10s\n" "$(human "$P2")"
done

# ── 5. OG image from the revealed temple frame ──────────────────────────────
echo ""
echo "→ og-image.webp (1200×630) from ujjain-temple-dawn-final.webp"
"$FF" -y -hide_banner -loglevel error -i "$POSTER_DIR/ujjain-temple-dawn-final.webp" \
  -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" \
  -quality 88 -compression_level 6 \
  "$ROOT/public/og-image.webp"

echo ""
echo "══════════════════════════════════════════════════════════"
printf "  TOTAL  before %s  →  after (mp4) %s\n" "$(human "$TOTAL_BEFORE")" "$(human "$TOTAL_AFTER")"
echo "══════════════════════════════════════════════════════════"
echo "  ✓ 3 optimised videos → public/videos/optimized/"
echo "  ✓ 6 poster frames    → public/posters/"
echo "  ✓ 1 og image         → public/og-image.webp"
