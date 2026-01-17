#!/bin/bash

echo "🔧 Fixing Canvas Workshop integration..."

# Simply copy the integrated version to the main filename
cp components/canvases/CanvasWorkshopManager_INTEGRATED.tsx components/canvases/CanvasWorkshopManager.tsx

echo "✅ Fixed! The complete file is now in place."
echo ""
echo "Please refresh your browser to see the changes."
