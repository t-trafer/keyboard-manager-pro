#!/bin/bash

sed -i '' -e '1s/^/"use client";\n/' ./dist/index.js
sed -i '' -e '1s/^/"use client";\n/' ./dist/index.cjs
