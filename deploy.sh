#!/bin/bash
mkdir docs
bun run build &&
rm -r docs/* &&
cp CNAME docs/CNAME &&
cp .nojekyll docs/.nojekyll
cp docs/index.html docs/404.html
mv build/client/* docs &&
rm -r build &&
echo deployed!!
