#!/bin/bash
# Update Navbar.jsx to use createPortal for MobileMenu
sed -i '' "1s/^/import { createPortal } from 'react-dom';\n/" src/components/layout/Navbar.jsx
sed -i '' "s/<MobileMenu isMenuOpen={mobileOpen} setIsMenuOpen={setMobileOpen} \/>/{typeof document !== 'undefined' ? createPortal(<MobileMenu isMenuOpen={mobileOpen} setIsMenuOpen={setMobileOpen} \/>, document.body) : null}/g" src/components/layout/Navbar.jsx
