var getComponentName = require('../lib/component-name');
var requireIcons = require.context('./svg', false, /^\.\/.*\.svg$/);

var reFileName = /^\.\/(.*)\.svg/;

var exports = {
  icons: {}
};

requireIcons.keys().forEach(function(iconFilename) {
  var iconName = reFileName.exec(iconFilename)[1];
  var iconComponent = requireIcons(iconFilename);
  var iconComponentName = getComponentName(iconName);
  exports.icons[iconName] = iconComponent;
  exports[iconComponentName] = iconComponent;
});

module.exports = exports;
