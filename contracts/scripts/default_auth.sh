#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

need_cmd() {
  if ! check_cmd "$1"; then
    printf "need '$1' (command not found)"
    exit 1
  fi
}

check_cmd() {
  command -v "$1" &>/dev/null
}

need_cmd jq

export RPC_URL="http://localhost:5050"

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo "---------------------------------------------------------------------------"

# enable system -> models authorizations
sozo auth grant --world $WORLD_ADDRESS --wait writer \
  Player,0x19eb63ef6d7b913d85f7df8b83f945eceb9632adf8f9ce84f659440231e02cf\
  Tile,0x19eb63ef6d7b913d85f7df8b83f945eceb9632adf8f9ce84f659440231e02cf\
  >/dev/null

echo "Default authorizations have been successfully set."
