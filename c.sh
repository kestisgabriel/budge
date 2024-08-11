#!/bin/bash
commit_message="$1"
git add .
git commit -m $commit_message

# permission to run script
# chmod +x c.sh