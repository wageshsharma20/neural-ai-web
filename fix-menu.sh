#!/bin/bash
# 1. Update MobileMenu.jsx to use CSS classes for the wrapper visibility
sed -i '' 's/ className="nav-overlay-wrapper"/ className={`nav-overlay-wrapper ${isMenuOpen ? "open" : ""}`}/g' src/components/layout/MobileMenu.jsx

# 2. Remove the onStart/onReverseComplete from gsap.timeline in MobileMenu.jsx
sed -i '' 's/onStart: () => {/onStart: () => { \/* removed *\/ /g' src/components/layout/MobileMenu.jsx
sed -i '' 's/gsap.set(navWrap, { visibility: "visible", pointerEvents: "auto" });//g' src/components/layout/MobileMenu.jsx
sed -i '' 's/onReverseComplete: () => {/onReverseComplete: () => { \/* removed *\/ /g' src/components/layout/MobileMenu.jsx
sed -i '' 's/gsap.set(navWrap, { visibility: "hidden", pointerEvents: "none" });//g' src/components/layout/MobileMenu.jsx

# 3. Add the .open class to MobileMenu.css
echo "
.nav-overlay-wrapper.open {
  visibility: visible;
  pointer-events: auto;
}
" >> src/components/layout/MobileMenu.css
