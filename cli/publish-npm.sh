#!/bin/bash
set -e

# Defaults to 'patch'.
# Can pass as 1st param: 'patch' | 'minor' | 'major'.
RELEASE="patch" && [ -n "$1" ] && RELEASE=$1

npm version $RELEASE
git push origin master
git push origin --tags
npm publish

echo "Done!"
exit 0
