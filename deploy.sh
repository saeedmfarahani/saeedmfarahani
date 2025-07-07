#!/bin/bash
mkdir docs
bun run build &&
rm -r docs/* &&
cp CNAME docs/CNAME &&
cp .nojekyll docs/.nojekyll
mv build/client/* docs &&
cp ./docs/index.html ./docs/404.html
rm -r build &&
echo deployed!!
