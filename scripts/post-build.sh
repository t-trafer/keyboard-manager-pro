#!/bin/bash

# This file is used to attach 'use client' directive to the output files
# to make them compatible with Next.js

# Cross-platform solution that works on both macOS and Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' -e '1s/^/"use client";\n/' ./dist/index.js
  sed -i '' -e '1s/^/"use client";\n/' ./dist/index.cjs
else
  # Linux
  sed -i '1s/^/"use client";\n/' ./dist/index.js
  sed -i '1s/^/"use client";\n/' ./dist/index.cjs
fi