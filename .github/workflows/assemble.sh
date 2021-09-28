#!/bin/bash

set -euo pipefail

for i in "$@"
do
	script_file=$(cat "$i" | jq -r .script);
	script=$(cat "$script_file" | sed -e 's/"/\\"/g;s/'\'/\\\''/g;s/$/\\n/' | tr -d '\n')
	cat "$i" | jq 'del(.script)' | jq -c '. + { "command" : "'"$script"'" }'
done
