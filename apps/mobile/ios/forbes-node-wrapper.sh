#!/usr/bin/env bash
# Wraps node so Expo/Xcode configure scripts don't crash when a parent
# directory has an unreadable node_modules (EPERM scandir).

REAL_NODE="${FORBES_REAL_NODE:-}"
if [[ -z "$REAL_NODE" ]]; then
  REAL_NODE="$(command -v node)"
fi

if [[ -z "$REAL_NODE" || ! -x "$REAL_NODE" ]]; then
  echo "error: could not find real node executable" >&2
  exit 1
fi

export FORBES_REAL_NODE="$REAL_NODE"

# Preload a small patch that treats EPERM on node_modules readdir as empty.
PRELOAD_DIR="$(cd "$(dirname "$0")" && pwd)"
export NODE_OPTIONS="--require ${PRELOAD_DIR}/forbes-node-fs-guard.cjs ${NODE_OPTIONS:-}"

exec "$REAL_NODE" "$@"
