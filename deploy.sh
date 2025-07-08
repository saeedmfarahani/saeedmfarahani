#!/bin/bash
bun run build &&
mv ./build/client ./docs &&
cp ./CNAME ./docs/ &&
cp ./.nojekyll ./docs/ &&
cp ./docs/index.html ./docs/404.html &&
rm -r build &&
git add . &&
git commit -m ":rocket: deploy" &&
git push &&
echo deployed!!
