const { withGradleProperties } = require('expo/config-plugins');

// AAPT2's compile daemon times out crunching the 10-25 MB PNGs in assets/
// on CI workers (both EAS and GitHub Actions), failing
// :app:mergeReleaseResources. Crunching only optimizes PNG size; skipping
// it does not change how the images look.
module.exports = function withPngCrunchDisabled(config) {
  return withGradleProperties(config, (c) => {
    c.modResults = c.modResults.filter(
      (item) => !(item.type === 'property' && item.key === 'android.enablePngCrunchInReleaseBuilds'),
    );
    c.modResults.push({
      type: 'property',
      key: 'android.enablePngCrunchInReleaseBuilds',
      value: 'false',
    });
    return c;
  });
};
