const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  let files = fs.readdirSync(dir);
  for (let f of files) {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  }
}

let modifiedFiles = 0;
walk('d:/stenth-web-change/src', (f) => {
  if (!f.endsWith('.tsx') && !f.endsWith('.ts')) return;
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content;

  // Enhance faint text colors directly
  newContent = newContent.replace(/text-white\/15/g, 'text-white/60');
  newContent = newContent.replace(/text-white\/20/g, 'text-white/70');
  newContent = newContent.replace(/text-white\/25/g, 'text-white/75');
  newContent = newContent.replace(/text-white\/30/g, 'text-white/80');
  newContent = newContent.replace(/text-white\/35/g, 'text-white/80');
  newContent = newContent.replace(/text-white\/40/g, 'text-white/80');
  newContent = newContent.replace(/text-brand-light\/40/g, 'text-brand-light/70');
  newContent = newContent.replace(/text-brand-light\/50/g, 'text-brand-light/80');

  // Enhance specific gray text on dark backgrounds
  newContent = newContent.replace(/text-gray-600/g, 'text-gray-400');
  newContent = newContent.replace(/text-gray-500/g, 'text-gray-300');

  // Selectively replace opacity on text elements
  newContent = newContent.replace(/className=(['"])(.*?)\1/g, (match, quote, classes) => {
    let newClasses = classes;
    // Check if it's text context
    if (classes.includes('text-')) {
      newClasses = newClasses.replace(/\bopacity-15\b/g, 'opacity-60');
      newClasses = newClasses.replace(/\bopacity-20\b/g, 'opacity-70');
      newClasses = newClasses.replace(/\bopacity-25\b/g, 'opacity-75');
      newClasses = newClasses.replace(/\bopacity-30\b/g, 'opacity-80');
      newClasses = newClasses.replace(/\bopacity-40\b/g, 'opacity-80');
      newClasses = newClasses.replace(/\btext-brand-muted\/50\b/g, 'text-brand-muted/80');
      newClasses = newClasses.replace(/\btext-brand-muted\/60\b/g, 'text-brand-muted/90');
    }
    return 'className=' + quote + newClasses + quote;
  });

  if (content !== newContent) {
    fs.writeFileSync(f, newContent, 'utf8');
    modifiedFiles++;
    console.log('Enhanced visibility in', f);
  }
});
console.log('Modified ' + modifiedFiles + ' files.');
