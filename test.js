const fs = require('fs');
let css = fs.readFileSync('src/components/layout/MobileMenu.css', 'utf8');
css = css.replace('display: none;', 'visibility: hidden; pointer-events: none;');
fs.writeFileSync('src/components/layout/MobileMenu.css', css);
