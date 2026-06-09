const fs = require('fs');
const path = require('path');

// Rename files
const renames = [
  ['src/App.tsx', 'src/App.jsx'],
  ['src/main.tsx', 'src/main.jsx'],
  ['src/components/Footer.tsx', 'src/components/Footer.jsx'],
  ['src/components/Navbar.tsx', 'src/components/Navbar.jsx'],
  ['src/pages/Home.tsx', 'src/pages/Home.jsx']
];

renames.forEach(([oldPath, newPath]) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${oldPath} to ${newPath}`);
  }
});

// Delete ts files
['src/custom.d.ts', 'tsconfig.tsbuildinfo', 'tsconfig.json'].forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log(`Deleted ${f}`);
  }
});

// Update package.json
const pkgPath = 'package.json';
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  
  if (pkg.devDependencies) {
    delete pkg.devDependencies['@types/node'];
    delete pkg.devDependencies['@types/react'];
    delete pkg.devDependencies['@types/react-dom'];
    delete pkg.devDependencies['typescript'];
    delete pkg.devDependencies['typescript-eslint'];
  }
  
  if (pkg.scripts && pkg.scripts.build) {
    pkg.scripts.build = "vite build";
  }
  
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('Updated package.json');
}

// Update index.html
const htmlPath = 'index.html';
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace('src/main.tsx', 'src/main.jsx');
  fs.writeFileSync(htmlPath, html);
  console.log('Updated index.html');
}

console.log('Migration complete.');
