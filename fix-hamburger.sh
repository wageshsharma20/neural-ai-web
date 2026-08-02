#!/bin/bash
# 1. Update Navbar.css to make the hamburger button extremely visible and bulletproof
sed -i '' 's/color: var(--bone);/color: #ffffff !important; background-color: rgba(255,255,255,0.1) !important; border: 1px solid rgba(255,255,255,0.3) !important; border-radius: 8px; z-index: 9999 !important; display: flex !important;/g' src/components/layout/Navbar.css

# 2. Update MobileMenu.css to make the menu background highly visible (dark grey instead of black)
sed -i '' 's/background: var(--ink, #0f0f11);/background: #1a1a24 !important;/g' src/components/layout/MobileMenu.css
sed -i '' 's/color: var(--bone, #f8f8ff);/color: #ffffff !important;/g' src/components/layout/MobileMenu.css
