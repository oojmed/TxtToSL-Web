const { execSync } = require('child_process');
const { renameSync, unlinkSync } = require('fs');

const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'build1/sw.js',
    swDest: 'build2/sw.js',
    globDirectory: 'dist',
    globPatterns: [
      '**\/*.{js,css,html,png,ico}',
    ]
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
};

buildSW();
