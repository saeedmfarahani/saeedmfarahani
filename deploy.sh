#!/bin/bash
bun run build &&
rm -r docs/* &&
cp CNAME docs/CNAME &&
cp .nojekyll docs/.nojekyll
mv build/client/* docs &&
rm -r build &&
echo deployed!!
